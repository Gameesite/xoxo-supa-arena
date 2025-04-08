
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

const supabaseUrl = 'https://tjzgnlwrrofcegvxeiye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqemdubHdycm9mY2VndnhlaXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNTY0MTIsImV4cCI6MjA1OTYzMjQxMn0.I2z32EhwQHxIvZsT46vw6lc_nNVCnkmcE8Gjq6L1xrw';

// Use the Database type which now includes the tables we just created
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
