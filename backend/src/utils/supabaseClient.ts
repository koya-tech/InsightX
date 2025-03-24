import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabaseUrl = process.env.SUPABASE_PROJECT_URL || '';
const supabaseAnonKey = process.env.SUPABASE_PROJECT_API_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
