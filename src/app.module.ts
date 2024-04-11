import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Report } from './reports/entities/report.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            // host: process.env.DB_HOST,
            // port: +process.env.DB_PORT,
            // username: process.env.DB_USERNAME,
            // password: process.env.DB_PASSWORD,
            // autoLoadEntities: true,
            entities: [User, Report],
            synchronize: process.env.NODE_ENV === 'production' ? false : true,
        }),
        ReportsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
