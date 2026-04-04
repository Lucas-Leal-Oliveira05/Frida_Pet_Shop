import { createClient } from "@supabase/supabase-js";
console.log("URL do Supabase:", import.meta.env.VITE_SUPABASE_URL);
console.log("Chave do Supabase:", import.meta.env.VITE_SUPABASE_ANON_KEY);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseAnonkey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
console.log("Chave do Supabase:", import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonkey)


