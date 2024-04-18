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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { ChangeRoleDto } from './dto/change-role.dto';
import { ManagerGuard } from 'src/guards/manager.guard';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

@Controller('auth')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Get('/me')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('/delete-me')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    DeleteMe(@CurrentUser() user: User) {
        return this.userService.deActive(+user.id);
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
    @UseGuards(AdminGuard)
    findUser(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Get()
    @UseGuards(AdminGuard)
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AdminGuard)
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(+id, body);
    }

    @Post('/active/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminGuard)
    activeUser(@Param('id') id: string) {
        return this.userService.active(+id);
    }

    @Post('/role/:id')
    @UseGuards(ManagerGuard)
    changeRole(@Param('id') id: string, @Body() body: ChangeRoleDto) {
        return this.userService.changeRole(+id, body.role);
    }
}
