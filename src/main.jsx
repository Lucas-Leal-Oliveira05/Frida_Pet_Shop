import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserPage from './pages/UserPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserPage/>
  </StrictMode>
)
