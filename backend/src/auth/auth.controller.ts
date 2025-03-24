import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    BadRequestException,
    UnauthorizedException,
    Req,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CustomLoggerService } from 'src/common/logger.service';
import { AuthDto } from 'src/type';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: CustomLoggerService,
    ) {}

    @Post('signup')
    async signup(@Body() signupDto: AuthDto, @Res() res: Response) {
        const { username, password } = signupDto;
        try {
            const { token, user } = await this.authService.signup(username, password);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 3 * 60 * 60 * 1000,
            });

            this.logger.log(`User ${user.username} signed up`);

            return res.status(HttpStatus.CREATED).json({
                message: 'Signup successful',
                token,
                userId: user.id,
                username: user.username,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(errorMessage);
            throw new BadRequestException(errorMessage);
        }
    }

    @Post('login')
    async login(@Body() loginDto: AuthDto, @Res() res: Response) {
        const { username, password } = loginDto;
        try {
            const { token } = await this.authService.login(username, password);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 3 * 60 * 60 * 1000,
            });

            this.logger.log(`User ${username} logged in`);

            return res.status(HttpStatus.OK).json({ message: 'Login successful', token });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(errorMessage);
            throw new UnauthorizedException(errorMessage);
        }
    }

    @Post('verify')
    verify(@Req() req: Request & { cookies?: any }, @Res() res: Response) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const token =
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            req.cookies?.jwt ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null);
        if (!token) {
            this.logger.error('Token not provided');
            throw new UnauthorizedException('Token not provided');
        }
        try {
            const user = this.authService.verifyToken(token);

            return res.status(HttpStatus.OK).json({
                message: 'Token valid',
                user: user,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(errorMessage);
            throw new UnauthorizedException(errorMessage);
        }
    }

    @Post('logout')
    logout(@Res() res: Response) {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        this.logger.log('User logged out');
        return res.status(HttpStatus.OK).json({
            message: 'Logout successful',
        });
    }
}
