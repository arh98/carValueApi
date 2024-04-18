import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

export enum UserRole {
    MANAGER = 'manager',
    ADMIN = 'admin',
    USER = 'user',
}
export class ChangeRoleDto {
    @IsString()
    @IsEnum(UserRole)
    @Transform(({ value }) => UserRole[value])
    role: UserRole;
}
