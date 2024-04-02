import { createUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

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
        return this.repo.find({ where: { email }, select: ['id', 'email'] });
    }

    async findOne(id: number) {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        // const { password, ...userDto } = user;
        return user;
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
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return this.repo.remove(user);
    }
}
