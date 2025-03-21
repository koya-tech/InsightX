import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomLoggerService } from 'src/common/logger.service';

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService, CustomLoggerService],
    exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
