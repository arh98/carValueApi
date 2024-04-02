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

@Controller('auth')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('/signup')
    createUser(@Body() userDto: createUserDto) {
        this.userService.create(userDto);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    @HttpCode(204)
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
        return this.userService.update(+id, updateDto);
    }
}
