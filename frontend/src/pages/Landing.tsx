import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function Landing() {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  const messages = ["Master DSA 🔥", "Crack Interviews 💼", "Learn with AI 🤖"];
  const [current, setCurrent] = useState(0);

  // ⏱ Cycle messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Redirect only if user is signed in AND loaded
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/home");
    }
  }, [isLoaded, isSignedIn, navigate]);

  // ✅ Wait for Clerk to load before rendering anything
  if (!isLoaded) return null;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background px-4">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-center text-foreground mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {messages[current]}
      </motion.h2>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button onClick={() => navigate("/sign-in")} className="text-lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
      <motion.div
        className="w-full mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
      <img
        src="https://www.svgrepo.com/svg/3368/waves"
        alt="Wave Illustration"
        className="w-full max-h-64 object-cover"
      />
      </motion.div>

    </section>
  );
}

export default Landing;





