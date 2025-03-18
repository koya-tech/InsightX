import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLoggerService } from './common/logger.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly logger: CustomLoggerService,
    ) {}

    @Get()
    getHello(): string {
        this.logger.log('Hello API was called');
        return this.appService.getHello();
    }
}
