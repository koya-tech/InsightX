import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/logger.service';
import { User } from 'src/type';
import { users } from 'src/utils/contant';

@Injectable()
export class UserService {
    constructor(private readonly logger: CustomLoggerService) {}

    getUser(id: string): User {
        const user = users.find((user) => user.id === id);
        if (!user) {
            this.logger.error(`User ${id} not found`);
            throw new BadRequestException('User not found');
        }
        return user;
    }
}
