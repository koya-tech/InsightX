import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
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
}
