import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Adicione estes logs para ver o estado da sessão
supabase.auth.onAuthStateChange((event, session) => {
  console.log('--- Auth State Change ---');
  console.log('Event:', event);
  if (session) {
    console.log('Session User ID:', session.user?.id);
    console.log('Session Access Token (partially shown):', session.access_token ? session.access_token.substring(0, 10) + '...' : 'N/A');
  } else {
    console.log('No active session.');
  }
  console.log('-------------------------');
});