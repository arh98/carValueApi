import { createUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signUp(userDto: createUserDto) {
        const users = await this.usersService.find(userDto.email);
        if (users.length) {
            return new BadRequestException('Email already in use');
        }

        const salt = randomBytes(8).toString('hex'),
            hash = (await scrypt(userDto.password, salt, 32)) as Buffer,
            result = salt + '.' + hash.toString('hex');

        const user = await this.usersService.create({
            email: userDto.email,
            password: result,
        });
        return user;
    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            return new NotFoundException(`User ${email} not found`);
        }
        const [salt, storedHash] = user.password.split('.'),
            hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            return new BadRequestException('Password incorrect');
        }
        return user;
    }
}
