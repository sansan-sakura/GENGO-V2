import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignedOut, SignedIn } from "@clerk/clerk-react"
import { RootLayout } from "./ui/layouts/RootLayout";
import DashboardLayout from "./ui/layouts/Dashboard";
// import { AppLayout } from "./ui/AppLayout";
// import { Error } from "./ui/Error";
// import { WelcomePage } from "./pages/WelcomePage";
// import { Dashboard } from "./pages/Dashboard";
// import { FlashcardPage } from "./pages/FlashcardPage";
// import { DeckPage } from "./pages/DeckPage";
// import { Settings } from "./pages/Settings";
// import { About } from "./pages/About";
// import { Contact } from "./pages/Contact";

import { SignUpPage } from "./pages/SignUp";
import { SignInPage } from "./pages/SignIn";
import { ContactPage } from "./pages/Contact";
import { DashboardPage } from "./pages/Dashboard";
import { IndexPage } from "./pages/IndexPage";
// import { LoginSignUpLayout } from "./ui/LoginSignUpLayout";



const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
          { path: "/", element: <IndexPage/> },
          { path: "/contact", element: <ContactPage /> },
          { path: "/sign-in", element: <SignInPage /> },
          { path: "/sign-up", element: <SignUpPage /> },
          {
            element: <DashboardLayout />,
            path: "dashboard",
            children: [
              { path: "/dashboard", element: <DashboardPage /> },
            ]
          }
        ]
      }
    
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
]);

function App() {
  return (
      <RouterProvider router={router} />
    
  );
}

export default App;