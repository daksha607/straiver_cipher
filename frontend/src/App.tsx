import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/ui/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import SyncUserToSupabase from './components/ui/SyncUserToSupabase'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

          {/* App Routes when signed in */}
          <Route
            path="/"
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

          {/* Fallback: if not signed in, show SignIn */}
          <Route
            path="*"
            element={
              <SignedOut>
                <SignIn routing="path" path="/sign-in" />
              </SignedOut>
            }
          />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  )
}

export default App





