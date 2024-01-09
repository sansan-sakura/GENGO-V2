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
// import { LoginSignUpLayout } from "./ui/LoginSignUpLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <IndexLayout />,
        children: [
          { path: '/', element: <IndexPage /> },
          { path: '/about', element: <AboutPage /> },
          { path: '/contact', element: <ContactPage /> },
          { path: '/settings', element: <SettingsPage /> },
        ],
      },

      {
        element: <AuthLayout />,
        children: [
          { path: '/sign-in', element: <SignInPage /> },
          { path: '/sign-up', element: <SignUpPage /> },
        ],
      },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      // { path: '/dashboard', element: <DashboardPage /> },
      { path: '/dashboard', element: <DeckPage /> },
      // { path: '/dashboard', element: <FlashcardPage /> },
    ],
  },

  //   { path: "/", element: <WelcomePage />, errorElement: <Error /> },
  //   {
  //     element: <LoginSignUpLayout />,
  //     errorElement: <Error />,
  //     children: [
  //       { path: "/login", element: <Login />, errorElement: <Error /> },
  //       { path: "/register", element: <SignUp />, errorElement: <Error /> },
  //     ],
  //   },
  //   {
  //     element: <AppLayout />,
  //     errorElement: <Error />,
  //     children: [
  //       {
  //         path: "/dashboard",
  //         element: <Dashboard />,
  //         errorElement: <Error />,
  //       },
  //       {
  //         path: "/flashcards",
  //         element: <FlashcardPage />,
  //         errorElement: <Error />,
  //       },
  //       {
  //         path: "/deck/:id",
  //         element: <DeckPage />,
  //         errorElement: <Error />,
  //       },
  //       {
  //         path: "/settings",
  //         element: <Settings />,
  //         errorElement: <Error />,
  //       },
  //       {
  //         path: "/about",
  //         element: <About />,
  //         errorElement: <Error />,
  //       },
  //       {
  //         path: "/contact",
  //         element: <Contact />,
  //         errorElement: <Error />,
  //       },
  //     ],
  //   },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
