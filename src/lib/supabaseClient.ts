import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcchljrmiprrszpsszaw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjY2hsanJtaXBycnN6cHNzemF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0ODg3MDUsImV4cCI6MjAzNDA2NDcwNX0.KS5hrExevXgRyV1SDXCgmVXsCOEgnxBHvS62X2iRfy0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
