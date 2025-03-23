import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Put,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomLoggerService } from 'src/common/logger.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly logger: CustomLoggerService,
    ) {}

    @Get(':id')
    async getUser(@Param('id') id: string) {
        try {
            const user = await this.userService.getUser(id);
            if (!user) {
                throw new NotFoundException('User not found');
            }
            this.logger.log(`User found: ${user.username}`);
            return user;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(errorMessage);
            throw new NotFoundException(errorMessage);
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: { username: string }) {
        try {
            await this.userService.updateUser(id, body.username);
            return { message: 'User updated successfully' };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(errorMessage);
            throw new NotFoundException(errorMessage);
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
        try {
            await this.userService.deleteUser(id);
            res.clearCookie('jwt', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });
            this.logger.log(`User ${id} deleted and JWT cookie cleared.`);
            res.status(HttpStatus.OK).send({
                message: 'User deleted successfully and JWT cookie cleared.',
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(errorMessage);
            throw new NotFoundException(errorMessage);
        }
    }
}
