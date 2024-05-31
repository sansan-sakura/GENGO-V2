import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SignedOut, SignedIn } from '@clerk/clerk-react'
import { RootLayout } from './ui/layouts/RootLayout'
import DashboardLayout from './ui/layouts/Dashboard'
// import { AppLayout } from "./ui/AppLayout";
// import { Error } from "./ui/Error";
import { FlashcardPage } from './pages/Flashcard'
import { DeckPage } from './pages/Deck'
import { SettingsPage } from './pages/Settings'
import { AboutPage } from './pages/About'

import { SignUpPage } from './pages/SignUp'
import { SignInPage } from './pages/SignIn'
import { ContactPage } from './pages/Contact'
import { DashboardPage } from './pages/Dashboard'
import { IndexPage } from './pages/IndexPage'
import AuthLayout from './ui/layouts/AuthLayout'
import { IndexLayout } from './ui/layouts/IndexLayout'
import { Error } from './ui/generic/Error'
// import { LoginSignUpLayout } from "./ui/LoginSignUpLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <IndexLayout />,
        errorElement: <Error />,
        children: [
          { path: '/', element: <IndexPage /> },
          { path: '/about', element: <AboutPage /> },
          { path: '/contact', element: <ContactPage /> },
          { path: '/settings', element: <SettingsPage /> },
        ],
      },

      {
        element: <AuthLayout />,
        errorElement: <Error />,
        children: [
          { path: '/sign-in', element: <SignInPage /> },
          { path: '/sign-up', element: <SignUpPage /> },
        ],
      },
    ],
  },
  {
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/decks', element: <DeckPage /> },
      { path: '/deck/:id', element: <FlashcardPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
