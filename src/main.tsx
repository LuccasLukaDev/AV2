import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import MeuRouter from './components/Router/MeuRouter'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MeuRouter />
  </BrowserRouter>
)
