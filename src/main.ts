import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieSession({
        keys: ['x1y2z3']
    }));
    app.useGlobalPipes(
        new ValidationPipe({
            validatorPackage: require('@nestjs/class-validator'),
            transformerPackage: require('@nestjs/class-transformer'),
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    await app.listen(3000);
}
bootstrap();
