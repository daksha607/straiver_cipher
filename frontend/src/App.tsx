import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import SyncUserToSupabase from "./components/ui/SyncUserToSupabase";

import Progress from "@/pages/Progress"
import Streak from "@/pages/Streak"
import ProblemsSolved from "@/pages/ProblemsSolved"
import DaysActive from "@/pages/DaysActive"

import HistoryPage from "@/pages/history";

function App() {

  return (

    <Routes>
      {/* 🔹 Landing Page */}
      <Route path="/" element={<Landing />} />
      {/* Public Route */}
      <Route
        path="/"
        element={
          <SignedOut>
            <Landing />
          </SignedOut>
        }
      />
      <Route
        path="/"
        element={
          <SignedIn>
            <Navigate to="/home" replace />
          </SignedIn>
        }
      />

      {/* Auth Routes */}
      <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

      {/* App Routes when signed in */}
      <Route
        path="/home"
        element={
          <SignedIn>
            <Navbar />
            <SyncUserToSupabase />
            <Home />
          </SignedIn>
        }
      />
      <Route
        path="/profile"
        element={
          <SignedIn>
            <Navbar />
            <SyncUserToSupabase />
            <Profile />
          </SignedIn>
        }
      />
      <Route
        path="/chat"
        element={
          <SignedIn>
            <Navbar />
            <SyncUserToSupabase />
            <Chat />
          </SignedIn>
        }
      />

      <Route
        path="/history"
        element={
          <SignedIn>
            <Navbar />
            <SyncUserToSupabase />
            <HistoryPage />
          </SignedIn>
       }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <SignedOut>
            <SignIn routing="path" path="/sign-in" />
          </SignedOut>
        }
      />

      <Route
        path="/progress"
        element={
          <SignedIn>
            <Navbar />
            <SyncUserToSupabase />
            <Progress />
          </SignedIn>
       }
     />
     <Route
      path="/streak"
      element={
        <SignedIn>
        <Navbar />
        <SyncUserToSupabase />
        <Streak />
    </SignedIn>
    }
    />
          
  <Route
  path="/problemssolved"
  element={
    <SignedIn>
      <Navbar />
      <SyncUserToSupabase />
      <ProblemsSolved />
    </SignedIn>
  }
/>
 
  <Route
  path="/daysactive"
  element={
    <SignedIn>
      <Navbar />
      <SyncUserToSupabase />
      <DaysActive />
    </SignedIn>
  }
/>

    </Routes>
  );
}

export default App;







