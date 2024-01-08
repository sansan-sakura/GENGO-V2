import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link, Outlet } from 'react-router-dom'

export const IndexLayout = () => {
  return (
    <div>
      <div className='fixed left-0 top-0 w-screen border-b-4 border-b-amber-100 bg-blue-dark px-10 py-10'>
        <div className='mx-auto flex w-full max-w-[1400px] items-end justify-between'>
          <h1 className='text-5xl text-amber-100 sm:text-6xl'>GENGO</h1>
          <SignedIn>
            <UserButton
              afterSignOutUrl='/sign-in'
              appearance={{
                elements: {
                  userButtonBox: 'w-16 h-16',
                  avatarBox: 'w-full h-full border-2 border-amber-100 shadow',
                },
              }}
            />
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
