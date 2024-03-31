import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            // host: process.env.DATABASE_HOST,
            // port: +process.env.DATABASE_PORT,
            // username: process.env.DATABASE_USERNAME,
            // password: process.env.DATABASE_PASSWORD,
            // autoLoadEntities: true,
            entities: [],
            synchronize: process.env.NODE_ENV === 'production' ? false : true,
        }),
        ReportsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
