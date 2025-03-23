import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/logger.service';
import { User, SupabaseUserSchema } from 'src/type';
import { users } from 'src/utils/contant';
import { supabase } from 'src/utils/supabaseClient';

@Injectable()
export class UserService {
    constructor(private readonly logger: CustomLoggerService) {}

    async getUser(id: string): Promise<User> {
        const cachedUser = users.find((user) => user.id === id);
        if (cachedUser) {
            return cachedUser;
        }

        const { data, error } = await supabase
            .from('users')
            .select<'*', SupabaseUserSchema>()
            .eq('id', id)
            .single();

        if (error || !data) {
            this.logger.error(`User with id ${id} not found: ${error?.message}`);
            throw new BadRequestException('User not found');
        }

        const targetUser: User = {
            id: data.id,
            username: data.user_name,
            passwordHash: '',
        };

        return targetUser;
    }

    async updateUser(id: string, username: string) {
        const cachedUser = users.find((user) => user.id === id);
        if (cachedUser) {
            cachedUser.username = username;
            this.logger.log(`User updated: ${cachedUser.username}`);
            return;
        }
        const { error } = await supabase
            .from('users')
            .update({
                user_name: username,
            })
            .eq('id', id)
            .single();

        if (error) {
            this.logger.error(`User with id ${id} not found: ${error?.message}`);
            throw new BadRequestException('User not found');
        }
    }

    async deleteUser(id: string) {
        const cachedUserIndex = users.findIndex((user) => user.id === id);
        if (cachedUserIndex !== -1) {
            users.splice(cachedUserIndex, 1);
            this.logger.log(`User deleted: ${id}`);
            return;
        }
        const { error } = await supabase.auth.admin.deleteUser(id);

        if (error) {
            this.logger.error(`User with id ${id} not found: ${error?.message}`);
            throw new BadRequestException('User not found');
        }
    }
}
