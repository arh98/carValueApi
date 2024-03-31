import { IsEmail, IsString } from '@nestjs/class-validator';

export class createUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
