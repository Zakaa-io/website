export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
}

const requiredPublicEnv = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const

const missingPublicEnv = requiredPublicEnv.filter((key) => !process.env[key])

if (missingPublicEnv.length > 0) {
  throw new Error(
    `Missing required public environment variables: ${missingPublicEnv.join(', ')}.`,
  )
}

export const env = {
  supabaseUrl: publicEnv.supabaseUrl!,
  supabaseAnonKey: publicEnv.supabaseAnonKey!,
}
