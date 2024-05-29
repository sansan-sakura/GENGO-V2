import * as React from 'react'
import {
  RedirectToSignIn,
  SignIn,
  SignedIn,
  SignedOut,
  useAuth,
} from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '../layoutParts/Header'
import { Footer } from '../layoutParts/Footer'

export default function DashboardLayout() {
  const { userId, isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in')
    }
  }, [])

  if (!isLoaded) return 'Loading...'

  return (
    <div className='min-w-screen grid min-h-screen grid-rows-[auto_1fr_auto] justify-center bg-amber-50/50'>
      <Header />
      <SignedIn>
        <Outlet />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <Footer />
    </div>
  )
}
