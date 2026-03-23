import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://twotkkadaxgnutmgfdxw.supabase.co";
const supabaseKey = "sb_publishable_xvWp1-BgFEsCGwmyCRKOkg_ObvHDmc2";

export const supabase = createClient(supabaseUrl, supabaseKey);