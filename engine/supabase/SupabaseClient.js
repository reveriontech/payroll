import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_REVERION_SUPABASE_URL
const supabaseKey = process.env.VITE_REVERION_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase