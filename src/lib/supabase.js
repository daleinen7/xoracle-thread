import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.GATSBY_SUPABASE_URL
const supabaseKey = process.env.GATSBY_SUPABASE_PUBLIC_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
