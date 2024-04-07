import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ycypmpdbtmpsjqublvez.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljeXBtcGRidG1wc2pxdWJsdmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMzY2NDQsImV4cCI6MjAyNDgxMjY0NH0.vBC30fXKWw3TRl5lFjEKHwkUSynnUfiNJ0fps2FNEUw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
