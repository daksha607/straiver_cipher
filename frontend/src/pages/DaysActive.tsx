import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

function DaysActive() {
  return (
    <div className="min-h-screen px-4 py-8 bg-background text-foreground">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">📅 Days Active</h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            ← Go Back
          </Button>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-lg space-y-4">
          <CalendarDays className="h-10 w-10 text-blue-500" />
          <p className="text-lg">You've been active for <strong>27 days</strong>.</p>
          <p className="text-muted-foreground">Keep showing up — you're building something great!</p>
        </div>
      </div>
    </div>
  )
}

export default DaysActive
