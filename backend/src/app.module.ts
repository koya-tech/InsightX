import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomLoggerService } from './common/logger.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, CustomLoggerService],
    exports: [CustomLoggerService],
})
export class AppModule {}
