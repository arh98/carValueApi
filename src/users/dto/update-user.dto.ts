import { IsEmail, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsString()
    @IsOptional()
    readonly password: string;
}
