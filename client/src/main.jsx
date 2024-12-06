import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Landing from './new_landing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Landing/>
  </StrictMode>,
)
