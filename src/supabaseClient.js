import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzxssvzofkwpkeanjegx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eHNzdnpvZmt3cGtlYW5qZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzI3MTUsImV4cCI6MjA5NjAwODcxNX0.Bai1xwRv5cMdV6twy_8VUWEHRf-I6IwCaJJeTiHnjAs';

export const supabase = createClient(supabaseUrl, supabaseKey);
