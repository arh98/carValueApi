import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
    @Post('/signup')
    createUser(@Body() userDto: createUserDto) {
        console.log(userDto);
    }
}
