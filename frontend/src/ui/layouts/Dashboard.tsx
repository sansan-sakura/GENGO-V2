import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '../layoutParts/Header'
import { Footer } from '../layoutParts/Footer'

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  console.log('test', userId)

  React.useEffect(() => {
    if (!userId) {
      navigate('/sign-in')
    }
  }, [])

  if (!isLoaded) return 'Loading...'

  return (
    <div className='min-w-screen grid min-h-screen grid-rows-[auto_1fr_auto] justify-center bg-amber-50/50'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
