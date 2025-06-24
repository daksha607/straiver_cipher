import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

import AppRoutes from './App.tsx'

import FloatingChatButton from "@/components/ui/FloatingChatButton.tsx";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <BrowserRouter>
        <AppRoutes />
        <FloatingChatButton />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)


