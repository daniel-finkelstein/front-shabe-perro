import { createRoot } from 'react-dom/client'

import Routing from './routing.jsx'
import AuthProvider from './auth/AuthProvider.jsx'

import './assets/styles/global.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AuthProvider>
      <Routing />
    </AuthProvider>
  // </StrictMode>,
)
