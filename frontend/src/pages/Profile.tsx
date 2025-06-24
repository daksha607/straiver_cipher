import { useUser, SignOutButton } from "@clerk/clerk-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  CheckCircle,
  CalendarDays,
  UserCog,
  Github,
  Twitter,
} from "lucide-react";

function Profile() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="p-8">
        <Skeleton className="h-16 w-16 rounded-full mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen px-4 py-10 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info */}
        <Card className="p-6 flex flex-col items-center shadow-xl">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
            <AvatarFallback>
              {user.firstName?.[0] ?? "U"}
              {user.lastName?.[0] ?? ""}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">{user.fullName}</h2>
          <p className="text-sm text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <div className="flex gap-3 mt-4">
            <Button variant="default" onClick={() => navigate("/chat")}>Chat with AI</Button>
            <SignOutButton>
              <Button variant="outline">Sign Out</Button>
            </SignOutButton>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md border rounded-xl">
            <CardHeader className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <CardTitle>Problems Solved</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>145 solved</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border rounded-xl">
            <CardHeader className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-orange-500" />
              <CardTitle>Current Streak</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>7 days in a row 🔥</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border rounded-xl">
            <CardHeader className="flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-blue-500" />
              <CardTitle>Days Active</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>23 days active</p>
            </CardContent>
          </Card>
        </div>

        {/* Editable Info */}
        <Card className="p-4">
          <CardHeader className="flex items-center gap-3">
            <UserCog className="h-6 w-6 text-purple-600" />
            <CardTitle>Profile Settings (coming soon)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You’ll be able to update your info here.</p>
          </CardContent>
        </Card>

        {/* Connected Accounts */}
        <Card className="p-4">
          <CardHeader className="flex items-center gap-3">
            <Github className="h-5 w-5 text-black" />
            <Twitter className="h-5 w-5 text-sky-500" />
            <CardTitle>Connected Accounts (coming soon)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Connect GitHub, Twitter and more.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;




