import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const BUILD_DATE =
  process.env.NEXT_PUBLIC_BUILD_DATE || process.env.BUILD_DATE || new Date().toISOString()

async function getSupabaseStatus() {
  const supabase = await createClient()

  try {
    const result = (await supabase
      .from('profiles')
      .select('id')
      .limit(1)) as { data: unknown; error: { message?: string } | null }

    const { data, error } = result

    if (error) {
      const message = error.message ?? 'Unknown error'
      const networkError = message.includes('Failed to fetch') || message.includes('NetworkError')

      return {
        connected: !networkError,
        label: networkError
          ? 'Connection failed'
          : 'Service reachable (query returned an error)',
        details: message,
        rowCount: Array.isArray(data) ? data.length : 0,
      }
    }

    return {
      connected: true,
      label: 'Connected',
      details: `Query succeeded, ${Array.isArray(data) ? data.length : 0} row(s) returned`,
      rowCount: Array.isArray(data) ? data.length : 0,
    }
  } catch (error) {
    return {
      connected: false,
      label: 'Connection failed',
      details:
        error instanceof Error ? error.message : String(error ?? 'Unknown error'),
      rowCount: 0,
    }
  }
}

export default async function StatusPage() {
  const status = await getSupabaseStatus()

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
          <h1 className="text-4xl font-bold">System Status</h1>
          <p className="mt-3 text-base text-muted-foreground">
            This page verifies whether your Supabase service is reachable and displays the current build timestamp.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Supabase Connection</h2>
            <p className="mt-6 text-sm text-muted-foreground">Status</p>
            <div className="mt-2 inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              {status.connected ? 'Connected' : 'Disconnected'}
            </div>
            <p className="mt-4 text-sm text-foreground">{status.label}</p>
            <p className="mt-2 text-sm text-muted-foreground">{status.details}</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Build Information</h2>
            <p className="mt-4 text-sm text-muted-foreground">Build timestamp</p>
            <p className="mt-2 text-base text-foreground break-words">{BUILD_DATE}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
