import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { SocketProvider } from './context/socketProvider.jsx' 
import App from './App.jsx'
import "./components/i18n.js";



createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
 
    <SocketProvider>
    <App />
    </SocketProvider>
 ,
=======
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
>>>>>>> 21bfc8e17500e38d45349fb7fe658fe686bfb231
)
