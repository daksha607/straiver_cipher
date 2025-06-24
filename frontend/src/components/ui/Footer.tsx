import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-foreground">
        <p className="text-sm mb-2 md:mb-0">
          © {new Date().getFullYear()} str-ai-ver. Built with ❤️ by Daksha.
        </p>
        <div className="flex gap-4">
          <a href="mailto:your@email.com" target="_blank" rel="noreferrer">
            <Mail className="h-5 w-5 hover:text-purple-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="h-5 w-5 hover:text-purple-500 transition" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github className="h-5 w-5 hover:text-purple-500 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
