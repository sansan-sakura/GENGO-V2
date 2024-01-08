import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link, Outlet } from 'react-router-dom'
import { ImHome3 } from 'react-icons/im'

export const IndexLayout = () => {
  return (
    <div>
      <div className='fixed left-0 top-0 w-screen border-b-4 border-b-amber-100 bg-red-light px-10 py-10'>
        <div className='mx-auto flex w-full max-w-[1400px] items-end justify-between'>
          <h1 className='font-display text-5xl font-bold text-amber-100 sm:text-6xl'>
            GENGO
          </h1>
          <SignedIn>
            <div className='flex items-end gap-5'>
              <Link
                to='/dashboard'
                className='mb-1 block text-base font-semibold text-amber-100 transition-colors duration-300 hover:text-amber-300 sm:text-2xl'
              >
                <ImHome3 />
              </Link>
              <div className='hidden sm:block'>
                <UserButton
                  afterSignOutUrl='/sign-in'
                  appearance={{
                    elements: {
                      userButtonBox: 'w-12 h-12',
                      avatarBox: 'w-full h-full border-2 border-amber-100 shadow',
                    },
                  }}
                />
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <Link
              to='/sign-in'
              className='border-b border-b-amber-100 text-amber-100 transition-colors duration-300 hover:border-b-amber-200 hover:text-amber-200'
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
