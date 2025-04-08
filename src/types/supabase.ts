
export interface Profile {
  id: string;
  username: string | null;
  points: number | null;
  games_played: number | null;
  games_won: number | null;
  rank: string | null;
  is_banned: boolean | null;
  ban_type: string | null;
  ban_end_date: string | null;
  is_hacker: boolean | null;
  gems: number | null;
  vip: boolean | null;
  vip_type: string | null;
}

export interface GameResult {
  id: string;
  user_id: string | null;
  game_type: string | null;
  result: string | null;
  created_at: string | null;
}

export interface Gift {
  id: string;
  user_id: string | null;
  gift_type: string;
  amount: number | null;
  sent_by: string | null;
  created_at: string | null;
}

export interface RedeemCode {
  id: string;
  code: string;
  type: string;
  reward_amount: number | null;
  is_vip: boolean | null;
  vip_type: string | null;
  all_rewards: boolean | null;
  created_at: string | null;
  claimed_by: string[] | null;
}

export interface CodeRedemption {
  id: string;
  user_id: string;
  code_id: string;
  redeemed_at: string;
}
