import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  useRuntimeConfig().public.supabaseUrl,
  useRuntimeConfig().public.supabaseAnonKey
)

console.log("supabase:", supabase);
if (!supabase) {
  console.error("Erreur de connexion à la BDD Supabase.");
} else {
  console.log("Connexion à la BDD Supabase établie.");
}