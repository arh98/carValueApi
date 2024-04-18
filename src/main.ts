import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
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
    console.log(`app is running on ${process.env.NODE_ENV} mode...`);
}
bootstrap();
