export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string
          icon: string
          id: string
          name: string
          reward_amount: number
          reward_type: string
        }
        Insert: {
          description: string
          icon: string
          id?: string
          name: string
          reward_amount: number
          reward_type: string
        }
        Update: {
          description?: string
          icon?: string
          id?: string
          name?: string
          reward_amount?: number
          reward_type?: string
        }
        Relationships: []
      }
      friend_requests: {
        Row: {
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      game_history: {
        Row: {
          board_size: number
          bot_id: string | null
          created_at: string
          duration: number
          game_type: string
          id: string
          is_draw: boolean | null
          moves: Json
          player1_id: string
          player2_id: string | null
          winner_id: string | null
        }
        Insert: {
          board_size: number
          bot_id?: string | null
          created_at?: string
          duration: number
          game_type: string
          id?: string
          is_draw?: boolean | null
          moves: Json
          player1_id: string
          player2_id?: string | null
          winner_id?: string | null
        }
        Update: {
          board_size?: number
          bot_id?: string | null
          created_at?: string
          duration?: number
          game_type?: string
          id?: string
          is_draw?: boolean | null
          moves?: Json
          player1_id?: string
          player2_id?: string | null
          winner_id?: string | null
        }
        Relationships: []
      }
      game_results: {
        Row: {
          created_at: string | null
          game_type: string | null
          id: string
          result: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          game_type?: string | null
          id?: string
          result?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          game_type?: string | null
          id?: string
          result?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      gifts: {
        Row: {
          amount: number | null
          created_at: string | null
          gift_type: string
          id: string
          sent_by: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          gift_type: string
          id?: string
          sent_by?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          gift_type?: string
          id?: string
          sent_by?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          ban_end_date: string | null
          ban_type: string | null
          blue_gems: number
          friends: string[]
          gems: number | null
          gold_coins: number
          id: string
          is_banned: boolean | null
          is_hacker: boolean | null
          level: number
          points: number | null
          red_gems: number
          unlocked_boards: string[]
          unlocked_bots: string[]
          unlocked_markers: string[]
          username: string | null
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          ban_end_date?: string | null
          ban_type?: string | null
          blue_gems?: number
          friends?: string[]
          gems?: number | null
          gold_coins?: number
          id: string
          is_banned?: boolean | null
          is_hacker?: boolean | null
          level?: number
          points?: number | null
          red_gems?: number
          unlocked_boards?: string[]
          unlocked_bots?: string[]
          unlocked_markers?: string[]
          username?: string | null
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          ban_end_date?: string | null
          ban_type?: string | null
          blue_gems?: number
          friends?: string[]
          gems?: number | null
          gold_coins?: number
          id?: string
          is_banned?: boolean | null
          is_hacker?: boolean | null
          level?: number
          points?: number | null
          red_gems?: number
          unlocked_boards?: string[]
          unlocked_bots?: string[]
          unlocked_markers?: string[]
          username?: string | null
          xp?: number
        }
        Relationships: []
      }
      redeem_codes: {
        Row: {
          all_rewards: boolean | null
          claimed_by: string[] | null
          code: string
          created_at: string | null
          id: string
          is_vip: boolean | null
          reward_amount: number | null
          type: string
          vip_type: string | null
        }
        Insert: {
          all_rewards?: boolean | null
          claimed_by?: string[] | null
          code: string
          created_at?: string | null
          id?: string
          is_vip?: boolean | null
          reward_amount?: number | null
          type: string
          vip_type?: string | null
        }
        Update: {
          all_rewards?: boolean | null
          claimed_by?: string[] | null
          code?: string
          created_at?: string | null
          id?: string
          is_vip?: boolean | null
          reward_amount?: number | null
          type?: string
          vip_type?: string | null
        }
        Relationships: []
      }
      shop_items: {
        Row: {
          description: string
          id: string
          image_url: string | null
          item_id: string
          name: string
          price_blue_gems: number | null
          price_gold: number | null
          price_red_gems: number | null
          type: string
        }
        Insert: {
          description: string
          id?: string
          image_url?: string | null
          item_id: string
          name: string
          price_blue_gems?: number | null
          price_gold?: number | null
          price_red_gems?: number | null
          type: string
        }
        Update: {
          description?: string
          id?: string
          image_url?: string | null
          item_id?: string
          name?: string
          price_blue_gems?: number | null
          price_gold?: number | null
          price_red_gems?: number | null
          type?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          level: number
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          level?: number
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          level?: number
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
