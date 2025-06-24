import { ThemeToggle } from "@/components/ui/ThemeToggle"; 
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

function Navbar() {
  return (
    <nav className="max-w-6xl mx-auto mt-4 mb-6 px-6">
      <div className="bg-card/80 backdrop-blur-md shadow-xl rounded-2xl px-6 py-4 flex items-center justify-between border border-border">
        <Link to="/" className="text-xl font-bold text-primary">
          str-ai-ver
        </Link>

        <div className="space-x-4">
          <Link to="/home">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost">Profile</Button>
          </Link>
          <Link to="/chat">
            <Button variant="ghost">Chat</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
