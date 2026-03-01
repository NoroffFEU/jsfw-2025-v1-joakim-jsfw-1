import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ProductPage from './ProductPage.tsx'
import ContactPage from './ContactPage.tsx'

const container =
  document.getElementById('root') ?? document.getElementById('app')

if (!container) {
  throw new Error('Target container is not a DOM element.')
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
