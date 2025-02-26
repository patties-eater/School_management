import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pygsmzhuwkpgqppfblbu.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5Z3Ntemh1d2twZ3FwcGZibGJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTAwMzc2MCwiZXhwIjoyMDU0NTc5NzYwfQ.umM4MHXb0MpiFXea6B21zAvQWHVDVhTRd_HgrCNGQb0';
export const supabase = createClient(supabaseUrl, supabaseKey);
