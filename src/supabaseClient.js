import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nanhugjfciijagongauh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hbmh1Z2pmY2lpamFnb25nYXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2OTc2NDksImV4cCI6MjAwOTI3MzY0OX0.mmck85ddAGcSw7BZ050QH9jECS0d8ZU36Mm8FZChVWw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)