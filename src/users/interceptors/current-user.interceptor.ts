import { UsersService } from '../services/users.service';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly userService: UsersService) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();

        const { userId } = req.session || {};
        if (userId) {
            const user = this.userService.findOne(userId);
            req.currentUser = user;
        }
        return next.handle();
    }
}
