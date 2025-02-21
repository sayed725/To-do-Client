import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routes/Routes.jsx'

import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './providers/AuthProvider.jsx'




const queryClient = new QueryClient()





createRoot(document.getElementById('root')).render(
  // <StrictMode>

 <HelmetProvider>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <Toaster position='top-right' reverseOrder={false} />
    </QueryClientProvider>
  </AuthProvider>
 </HelmetProvider>

  // </StrictMode>,
)
