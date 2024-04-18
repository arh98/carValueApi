import { ReportsService } from './../../reports/reports.service';
import { createUserDto } from '../dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}

    create(createDto: createUserDto) {
        const user = this.repo.create({ ...createDto });
        return this.repo.save(user);
    }

    find(email?: string) {
        return this.repo.find({
            where: { email },
            // select: ['id', 'email', 'password' ],
        });
    }

    async findOne(id: number) {
        if (!id) {
            return null;
        }
        return await this.findAndCheckExists(id);
    }

    async update(id: number, updateDto: UpdateUserDto) {
        const user = await this.repo.preload({
            id: +id,
            ...updateDto,
        });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findAndCheckExists(id);
        return this.repo.remove(user);
    }

    async deActive(id: number) {
        const user = await this.findAndCheckExists(id);
        user.active = false;
        return this.repo.save(user);
    }

    async active(id: number) {
        const user = await this.findAndCheckExists(id);
        user.active = true;
        return this.repo.save(user);
    }

    async changeRole(id: number, role: string) {
        const user = await this.findAndCheckExists(id);
        user.role = role;
        return this.repo.save(user);
    }

    async findAndCheckExists(id: number) {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }
}
