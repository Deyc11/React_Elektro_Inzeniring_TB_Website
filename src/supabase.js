import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ryqewdinehhdforcpqxy.supabase.co"; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cWV3ZGluZWhoZGZvcmNwcXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODIzODYsImV4cCI6MjA1Njc1ODM4Nn0.9VMnpK41bLCw07FrA884vYfxmZZRoGdUp1n1E_ltddg"; // Replace with your Supabase API Key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
