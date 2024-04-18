import { UsersService } from '../services/users.service';
import { Injectable, NestMiddleware } from '@nestjs/common';

// declare global {
//     namespace Express {
//         interface Request {
//             currentUser?: User;
//         }
//     }
// }

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) {}
    async use(req: any, res: any, next: (error?: any) => void) {
        const { userId } = req.session || {};
        if (userId) {
            const user = await this.userService.findOne(userId);
            req.currentUser = user;
        }
        next();
    }
}
