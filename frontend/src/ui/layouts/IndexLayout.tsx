import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Link, Outlet } from "react-router-dom"


export const IndexLayout = () => {
  return (
    <div>
        <div className="fixed top-0 left-0 w-screen bg-blue-dark px-10 py-10 border-b-4 border-b-amber-100">
            <div className="flex justify-between items-end">
        <h1 className="text-6xl text-amber-100">GENGO</h1>
          <SignedIn>
            <UserButton afterSignOutUrl='/sign-in' appearance={{elements:{
              userButtonBox:"w-16 h-16",
              avatarBox:"w-full h-full border-2 border-amber-100 shadow"
            }    
            }} />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" className="border-b border-b-black hover:text-gray-700">Sign In</Link>
          </SignedOut>
          </div>
        </div>
    <Outlet/>
    </div>
  )
}
