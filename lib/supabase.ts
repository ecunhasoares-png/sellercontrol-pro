import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hwcyeyvptcouqttlvbke.supabase.co'                                                 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3Y3lleXZwdGNvdXF0dGx2YmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzE2MDAsImV4cCI6MjA4ODUwNzYwMH0.tG91qHWekclmXF6CJuOy3Kt82ueVkWyPepUg03jhHKw'

export const supabase = createClient(supabaseUrl, supabaseKey) 