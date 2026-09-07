import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Ce client utilise la clé "service role" : il ne doit JAMAIS être importé
// dans un composant client ni renvoyé au navigateur. Il n'est utilisé que
// dans les routes API (app/api/**/route.ts) et les Server Components.
let cached: SupabaseClient | null = null;

export function getServiceSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Variables Supabase manquantes : vérifie NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local (voir .env.example)."
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
