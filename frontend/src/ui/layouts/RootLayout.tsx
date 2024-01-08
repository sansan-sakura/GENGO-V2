import { Outlet } from 'react-router-dom'
import { Particle } from '../animations/Particle'

export const RootLayout = () => {
  return (
    <div className='flex h-full min-h-screen w-screen items-center justify-center bg-amber-50/50'>
      <div className='z-[100]'>
        <Outlet />
      </div>
      <Particle />
    </div>
  )
}
