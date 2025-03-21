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
    getUser(@Param('id') id: string) {
        try {
            const user = this.userService.getUser(id);
            this.logger.log(`User found: ${user.username}`);
            return user;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(errorMessage);
            throw new NotFoundException(errorMessage);
        }
    }
}
