import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, ListChecks, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

function Progress() {
  return (
    <div className="min-h-screen px-4 py-8 bg-background text-foreground">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">📈 Your Progress Overview</h1>
          <Button variant="outline" onClick={() => window.history.back()}>← Go Back</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="shadow-md border rounded-xl">
            <CardHeader className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <CardTitle className="text-lg sm:text-xl">DSA Mastery</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>You've completed 120/450 problems (Leetcode style).</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border rounded-xl">
            <CardHeader className="flex items-center gap-3">
              <ListChecks className="h-6 w-6 text-green-600" />
              <CardTitle className="text-lg sm:text-xl">Topics Completed</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>15/20 major DSA topics completed.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border rounded-xl">
            <CardHeader className="flex items-center gap-3">
              <Target className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-lg sm:text-xl">Streak</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>You’ve been active for 14 days straight!</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border rounded-xl">
            <CardHeader className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-orange-500" />
              <CardTitle className="text-lg sm:text-xl">Overall Score</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Your overall completion is at 73%. Great job!</p>
            </CardContent>
          </Card>
        </div>

        {/* Optional: Motivational */}
        <div className="mt-8 text-center text-lg text-muted-foreground">
          🚀 Keep going! Every question brings you closer to cracking that dream job.
        </div>
      </div>
    </div>
  )
}

export default Progress
