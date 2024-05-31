import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import App from './App.tsx'
import './styles/style.css'
import './styles/reset.css'
import ErrorBoundary from './ui/generic/ErrorBoundary/index.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from './ui/shadcn/toaster.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ErrorBoundary fallback={<p>There was an error</p>}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <App />
            <Toaster />
          </RecoilRoot>
        </QueryClientProvider>
      </ErrorBoundary>
    </ClerkProvider>
  </React.StrictMode>,
)
