import { IsEmail, IsString } from '@nestjs/class-validator';

export class createUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;
}
