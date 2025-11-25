import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://juxjqizcdiprfnqkjgzj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eGpxaXpjZGlwcmZucWtqZ3pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMTIyMTksImV4cCI6MjA3ODU4ODIxOX0.GPvCtKnwLf2GoMoWLVIYzO2UlabidFnt9esK6Kt7qNE' // Замените на ваш ключ из настроек Supabase

export const supabase = createClient(supabaseUrl, supabaseKey)