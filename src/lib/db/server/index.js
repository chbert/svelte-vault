import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/public'
import { env as envPrivate } from '$env/dynamic/private'

export const supabaseAdminClient = createClient(
	env.PUBLIC_SUPABASE_URL,
	envPrivate.PRIVATE_SUPABASE_SERVICE_KEY
)
