import { useUser } from "@clerk/clerk-react"
import {
  Sun,
  Flame,
  CheckCircle,
  CalendarDays,
  Bolt,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom";

const topics = ["DSA", "Aptitude", "Core Subjects", "System Design"] as const

const contentMap: Record<(typeof topics)[number], { title: string; description: string }[]> = {
  DSA: [
    { title: "Data Structures", description: "Master patterns and edge cases" },
    { title: "Algorihtms", description: "Understand traversal, cycles" },
  ],
  Aptitude: [
    { title: "Percentages", description: "Quick tricks & speed math" },
    { title: "Probability", description: "Formulas and puzzles" },
    { title: "Time & Work", description: "Real-world logic problems" },
  ],
  "Core Subjects": [
    { title: "DBMS", description: "Normalization, indexing" },
    { title: "OS", description: "Scheduling, memory" },
    { title: "CN", description: "Layers, protocols" },
  ],
  "System Design": [
    { title: "Load Balancing", description: "Distribute traffic smartly" },
    { title: "Caching", description: "Reduce load & speed up" },
    { title: "Sharding", description: "Split data across DBs" },
  ],
}

function Home() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<(typeof topics)[number]>("DSA")

  return (
    <div className="min-h-screen px-4 py-8 bg-background text-foreground">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Welcome + Theme Toggle */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            👋 Welcome back, {user?.firstName ?? "User"}!
          </h1>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/Progress">
          <Card className="shadow-md border rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
            <CardHeader className="flex items-center gap-3">
              <Bolt className="h-6 w-6 text-purple-500" />
              <CardTitle className="text-xl">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Track your DSA completion rate and overall journey.</p>
            </CardContent>
          </Card>
          </Link>

          <Link to="/Streak">
          <Card className="shadow-md border rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
            <CardHeader className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-orange-500" />
              <CardTitle className="text-xl">Current Streak</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Maintain your daily problem-solving streak!</p>
            </CardContent>
          </Card>
          </Link>
          
          <Link to="/ProblemsSolved">
          <Card className="shadow-md border rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
            <CardHeader className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <CardTitle className="text-xl">Problems Solved</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Total problems you’ve cracked so far.</p>
            </CardContent>
          </Card>
          </Link>

          <Link to="/DaysActive">
          <Card className="shadow-md border rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
            <CardHeader className="flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-xl">Days Active</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Track how consistently you’ve been learning.</p>
            </CardContent>
          </Card>
          </Link>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold mt-10">
          🚀 Everything You Need to Crack an Interview
        </h2>

        {/* Tab Selector and Content */}
        <div className="mt-4 border border-muted p-6 rounded-xl shadow-sm bg-card text-card-foreground">
          {/* Tab Nav */}
          <div className="flex gap-4 mb-6 flex-wrap">
            {topics.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                } transition`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <AnimatePresence mode="wait">
              {contentMap[activeTab].map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-40 p-4 flex flex-col justify-center bg-muted/30 border border-muted-foreground rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
            {/* Footer */}
            <footer className="mt-12 border-t pt-6 text-sm text-center text-muted-foreground">
            <p>
            Built with 💻 using React, Tailwind, and AI © {new Date().getFullYear()} str-ai-ver. All rights reserved.
            </p>
            </footer>
    </div>
  )
}

export default Home






