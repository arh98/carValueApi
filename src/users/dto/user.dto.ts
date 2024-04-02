import { Expose } from '@nestjs/class-transformer';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}
