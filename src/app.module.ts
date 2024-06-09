import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Report } from './reports/entities/report.entity';
import { ConfigModule } from '@nestjs/config';
const cookieSession = require('cookie-session');

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: [User, Report],
            synchronize: process.env.NODE_ENV === 'production' ? false : true,
        }),
        UsersModule,
        ReportsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
    constructor() {}

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: [process.env.COOKIE_KEY],
                }),
            )
            .forRoutes('*');
    }
}
