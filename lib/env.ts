export function getPublicEnv() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing required Supabase public environment variables. Set either:\n" +
        "- NEXT_PUBLIC_SUPABASE_URL and (NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)\n" +
        "Or:\n" +
        "- SUPABASE_URL and (SUPABASE_ANON_KEY or SUPABASE_PUBLISHABLE_KEY)",
    )
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  }
}
