import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://vumokpibkolgoxecturz.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bW9rcGlia29sZ294ZWN0dXJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0Mjk2NzQsImV4cCI6MjAwNTAwNTY3NH0.O8SJGfTi8BJCrFD5-63qte-LX3obqFhYr0MS5M35Oz0"

export const supabase = createClient(supabaseUrl, supabaseKey)
