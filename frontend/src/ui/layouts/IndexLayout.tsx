import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link, Outlet } from 'react-router-dom'
import { ImHome3 } from 'react-icons/im'
import { Hanko } from '../generic/Hanko'

export const IndexLayout = () => {
  return (
    <div>
      <div className='fixed left-0 top-0 w-screen  bg-amber-50/50 px-10 py-10 shadow-md'>
        <div className='mx-auto flex w-full max-w-[1000px] items-end justify-between '>
          <div className='flex items-center gap-2'>
            <Hanko size='sm' />
            <h1 className='font-display text-5xl font-bold text-black/80 sm:text-6xl'>
              GENGO
            </h1>
          </div>
          <SignedIn>
            <div className='flex items-end gap-5'>
              <Link
                to='/dashboard'
                className='mb-1 block text-base font-semibold text-red-dark transition-colors duration-300 hover:text-red-dark/80 sm:text-2xl'
              >
                <ImHome3 />
              </Link>
              <div className='hidden sm:block'>
                <UserButton
                  afterSignOutUrl='/sign-in'
                  appearance={{
                    elements: {
                      userButtonBox: 'w-12 h-12',
                      avatarBox: 'w-full h-full border border-red-dark shadow',
                    },
                  }}
                />
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <Link
              to='/sign-in'
              className='border-b border-b-red-dark text-red-dark transition-colors duration-300 hover:border-b-red-dark/70 hover:text-red-dark/70'
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
