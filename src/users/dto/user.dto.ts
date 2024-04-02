// import { Expose } from '@nestjs/class-transformer';
import { Expose } from 'class-transformer';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}
