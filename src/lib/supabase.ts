
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

const supabaseUrl = 'https://tjzgnlwrrofcegvxeiye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqemdubHdycm9mY2VndnhlaXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNTY0MTIsImV4cCI6MjA1OTYzMjQxMn0.I2z32EhwQHxIvZsT46vw6lc_nNVCnkmcE8Gjq6L1xrw';

// Define custom types for our database schema
type CustomDatabase = Database & {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          is_banned: boolean | null;
          ban_type: string | null;
          ban_end_date: string | null;
          is_hacker: boolean | null;
          points: number | null;
          gems: number | null;
          games_played: number | null;
          games_won: number | null;
          rank: string | null;
          vip: boolean | null;
          vip_type: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
          is_banned?: boolean | null;
          ban_type?: string | null;
          ban_end_date?: string | null;
          is_hacker?: boolean | null;
          points?: number | null;
          gems?: number | null;
          games_played?: number | null;
          games_won?: number | null;
          rank?: string | null;
          vip?: boolean | null;
          vip_type?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          is_banned?: boolean | null;
          ban_type?: string | null;
          ban_end_date?: string | null;
          is_hacker?: boolean | null;
          points?: number | null;
          gems?: number | null;
          games_played?: number | null;
          games_won?: number | null;
          rank?: string | null;
          vip?: boolean | null;
          vip_type?: string | null;
        };
      };
      game_results: {
        Row: {
          id: string;
          user_id: string | null;
          game_type: string | null;
          result: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          game_type?: string | null;
          result?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          game_type?: string | null;
          result?: string | null;
          created_at?: string | null;
        };
      };
      gifts: {
        Row: {
          id: string;
          user_id: string | null;
          gift_type: string;
          amount: number | null;
          sent_by: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          gift_type: string;
          amount?: number | null;
          sent_by?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          gift_type?: string;
          amount?: number | null;
          sent_by?: string | null;
          created_at?: string | null;
        };
      };
      redeem_codes: {
        Row: {
          id: string;
          code: string;
          type: string;
          reward_amount: number | null;
          is_vip: boolean | null;
          vip_type: string | null;
          all_rewards: boolean | null;
          created_at: string | null;
          claimed_by: string[] | null;
        };
        Insert: {
          id?: string;
          code: string;
          type: string;
          reward_amount?: number | null;
          is_vip?: boolean | null;
          vip_type?: string | null;
          all_rewards?: boolean | null;
          created_at?: string | null;
          claimed_by?: string[] | null;
        };
        Update: {
          id?: string;
          code?: string;
          type?: string;
          reward_amount?: number | null;
          is_vip?: boolean | null;
          vip_type?: string | null;
          all_rewards?: boolean | null;
          created_at?: string | null;
          claimed_by?: string[] | null;
        };
      };
      code_redemptions: {
        Row: {
          id: string;
          user_id: string;
          code_id: string;
          redeemed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          code_id: string;
          redeemed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          code_id?: string;
          redeemed_at?: string;
        };
      };
    };
  };
};

// Use the customized Database type
export const supabase = createClient<CustomDatabase>(supabaseUrl, supabaseKey);
