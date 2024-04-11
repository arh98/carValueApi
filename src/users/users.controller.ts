import { AuthService } from './services/auth.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Session,
    UseGuards,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './services/users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/common/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Get('/me')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
        // return this.userService.findOne(session.userId);
    }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() body: createUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body);
        session.userId = user['id'];
        return user;
    }

    @Post('/signin')
    async signinUser(@Body() body: createUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user['id'];
        return user;
    }

    @Post('/signout')
    signOutUser(@Session() session: any) {
        session.userId = null;
    }

    @Get('/:id')
    @Serialize(UserDto)
    findUser(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
        return this.userService.update(+id, updateDto);
    }
}
