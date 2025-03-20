import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomLoggerService } from './common/logger.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const logger = new CustomLoggerService();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useLogger(logger);

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(cookieParser());

    // if (!process.env.COOKIE_KEYS) {
    //     throw new Error('COOKIE_KEYS is not set in environment variables.');
    // }

    // app.use(
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //     cookieSession({
    //         name: 'session',
    //         keys: [process.env.COOKIE_KEYS],
    //         maxAge: 3 * 60 * 60 * 1000,
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === 'production',
    //         sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
    //     }),
    // );

    await app.listen(process.env.PORT ?? 3000);

    logger.nestLog('Nest application successfully started', 'NestApplication');
}
bootstrap();
