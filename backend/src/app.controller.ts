import { Controller, ForbiddenException, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLoggerService } from './common/logger.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Request } from 'express';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly logger: CustomLoggerService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    getHello(@Param('userId') userId: string, @Req() req: Request): string {
        this.logger.log('Hello API was called');
        const user = req.user as { userId: string };
        if (user.userId !== userId) {
            throw new ForbiddenException('You are not authorized to access this profile.');
        }
        return this.appService.getHello();
    }
}
