import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/common/serialize.interceptor';

@Controller('auth')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post('/signup')
    createUser(@Body() userDto: createUserDto) {
        this.service.create(userDto);
    }

    @Get('/:id')
    @Serialize(UserDto)
    findUser(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.service.find(email);
    }

    @Delete('/:id')
    @HttpCode(204)
    deleteUser(@Param('id') id: string) {
        return this.service.remove(+id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
        return this.service.update(+id, updateDto);
    }
}
