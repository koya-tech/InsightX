import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomLoggerService } from './common/logger.service';

async function bootstrap() {
    const logger = new CustomLoggerService();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useLogger(logger);

    await app.listen(process.env.PORT ?? 3000);

    logger.nestLog('Nest application successfully started', 'NestApplication');
}
bootstrap();
