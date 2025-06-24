import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

function ProblemsSolved() {
  return (
    <div className="min-h-screen px-4 py-8 bg-background text-foreground">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">✅ Problems Solved</h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            ← Go Back
          </Button>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-lg space-y-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
          <p className="text-lg">You've solved <strong>135 problems</strong> so far.</p>
          <p className="text-muted-foreground">Excellent progress! Aim for consistent daily growth.</p>
        </div>
      </div>
    </div>
  )
}

export default ProblemsSolved
