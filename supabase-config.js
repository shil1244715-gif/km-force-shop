// Public project URL and publishable (anon) key — safe to expose in client-side code.
// Row Level Security policies on the database control what this key can actually do.
const SUPABASE_URL = 'https://gzikhshevwxngwhcifik.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MBEdQw88-6EloEhjSXHSZg_IcBl_XLE';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
