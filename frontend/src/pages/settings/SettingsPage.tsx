import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function SettingsPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <PageHeader
        title="Settings"
        description="Configure your platform preferences"
      />

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-900">General</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="org-name" className="mb-1.5 block text-sm font-medium text-slate-700">
              Organization Name
            </label>
            <input
              id="org-name"
              type="text"
              defaultValue="TransitOps"
              className="h-10 w-full max-w-md rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label htmlFor="timezone" className="mb-1.5 block text-sm font-medium text-slate-700">
              Timezone
            </label>
            <select
              id="timezone"
              className="h-10 w-full max-w-md rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option>Asia/Kolkata (IST)</option>
              <option>UTC</option>
              <option>America/New_York (EST)</option>
            </select>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
