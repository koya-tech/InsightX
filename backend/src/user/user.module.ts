import { Module } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/logger.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, CustomLoggerService],
    exports: [],
})
export class UserModule {}
