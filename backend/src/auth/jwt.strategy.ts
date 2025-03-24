import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomLoggerService } from 'src/common/logger.service';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly logger: CustomLoggerService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    validate(payload: { userId: string }) {
        // todo : check if user exists in db
        if (!payload.userId) {
            this.logger.error('Invalid token: missing userId');
            throw new UnauthorizedException('Invalid token');
        }
        return { userId: payload.userId };
    }
}
