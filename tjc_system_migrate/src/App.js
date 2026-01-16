import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'

// --- LOAD YOUR CUSTOM STYLES ---
import './styles/Admin.css'
import './styles/SalesPage.css'
import './styles/InventoryPage.css'
import './styles/ProductPage.css'
import './styles/ReportsPage.css'
import './styles/SettingsPage.css'
import './styles/DeliveryPortal.css'

// [FIX] REMOVED THIS LINE TO PREVENT NAVBAR CONFLICTS
// import './styles/LandingPage.css' 

import './styles/Products.css'
import './styles/OrdersPage.css'
import './styles/App.css' // Login/Recovery styles

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// --- CONTAINERS ---
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// --- ADMIN PAGES (Standalone) ---
const Login = React.lazy(() => import('./views/pages/login/Login')) 
const Recovery = React.lazy(() => import('./views/pages/RecoveryPage'))
const DeliveryPortal = React.lazy(() => import('./views/admin/DeliveryPortal'))

// --- PROTECTION ---
const ProtectedRoute = React.lazy(() => import('./components/ProtectedRoute'))
const DebugAuth = React.lazy(() => import('./components/DebugAuth'))

// --- CLIENT PAGES (Public Website) ---
// LandingPage is no longer needed as Products is now the Home
const Products = React.lazy(() => import('./views/client/Products'))
const ProductDetails = React.lazy(() => import('./views/client/ProductDetails'))
const OrderStatus = React.lazy(() => import('./views/client/OrderStatus'))
const ContactUs = React.lazy(() => import('./views/client/ContactUs'))

const App = () => {
  // Clear any existing auth data when accessing /admin directly
  const handleAdminRedirect = () => {
    if (window.location.pathname === '/admin') {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
      localStorage.removeItem('userAvatar')
    }
  }

  React.useEffect(() => {
    handleAdminRedirect()
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          {/* --- ADMIN AUTH ROUTES --- */}
          <Route exact path="/admin/login" element={<Login />} />
          <Route exact path="/admin/recover-password" element={<Recovery />} />
          
          {/* --- ADMIN MAIN REDIRECT --- */}
          <Route exact path="/admin" element={<Navigate to="/admin/login" replace />} />
          
          {/* --- DRIVER PORTAL (Protected) --- */}
          <Route exact path="/admin/delivery" element={
            <ProtectedRoute requiredRole="driver">
              <DeliveryPortal />
            </ProtectedRoute>
          } />

          {/* --- CLIENT ROUTES (Public) --- */}
          {/* [FIX] Root "/" now loads the Products Showroom directly */}
          <Route exact path="/" element={<Products />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:name" element={<ProductDetails />} />
          <Route exact path="/order-status" element={<OrderStatus />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          
          {/* --- ADMIN DASHBOARD (Protected) --- */}
          <Route path="*" element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          } />
          
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App