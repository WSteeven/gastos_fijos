// lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://geslpiilysbxcjieyjkm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlc2xwaWlseXNieGNqaWV5amttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODE0MTksImV4cCI6MjA1Njg1NzQxOX0.y8odZo-GVUDo_lUXpltropS-yyBlc2vQx8MAsaATHOk';

export const supabase = createClient(supabaseUrl, supabaseKey,{
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});