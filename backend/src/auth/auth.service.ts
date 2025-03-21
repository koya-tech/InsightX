import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { CustomLoggerService } from 'src/common/logger.service';
import { User } from 'src/type';
import { users } from 'src/utils/contant';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default';

@Injectable()
export class AuthService {
    constructor(private readonly logger: CustomLoggerService) {}

    async signup(username: string, password: string): Promise<{ token: string; user: User }> {
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            this.logger.error(`Username ${username} already in use`);
            throw new BadRequestException('Username already in use');
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const passwordHash: string = await bcrypt.hash(password, 10);
        const newUser: User = {
            id: uuidv4(),
            username,
            passwordHash,
        };
        users.push(newUser);

        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
            expiresIn: '3h',
        });
        return { token, user: newUser };
    }

    async login(username: string, password: string): Promise<{ token: string; user: User }> {
        const user = users.find((user) => user.username === username);
        if (!user) {
            this.logger.error(`User ${username} not found`);
            throw new UnauthorizedException('Invalid credentials : user not found');
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) {
            this.logger.error(`Invalid password for user ${username}`);
            throw new UnauthorizedException('Invalid credentials : invalid password');
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '3h',
        });
        return { token, user };
    }

    verifyToken(token: string): User {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
            const userId = decoded.userId;
            const targetUser = users.find((user) => user.id === userId);
            if (!targetUser) {
                this.logger.error(`User ${userId} not found`);
                throw new UnauthorizedException('Invalid token : user not found');
            }
            return targetUser;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(errorMessage);
            throw new UnauthorizedException('Invalid token');
        }
    }
}
