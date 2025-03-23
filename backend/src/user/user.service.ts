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
}
