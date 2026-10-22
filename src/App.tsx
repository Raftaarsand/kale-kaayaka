import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { CheckoutPage } from './pages/CheckoutPage'
import { CraftFormPage } from './pages/CraftFormPage'
import { CraftsPage } from './pages/CraftsPage'
import { DiscoverPage } from './pages/DiscoverPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { OrdersPage } from './pages/OrdersPage'
import { PassportPage } from './pages/PassportPage'
import { ProductPage } from './pages/ProductPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DiscoverPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="passport/:productId" element={<PassportPage />} />
          <Route path="crafts" element={<CraftsPage />} />
          <Route path="crafts/new" element={<CraftFormPage key="new" />} />
          <Route path="crafts/:productId/edit" element={<CraftFormPage key="edit" />} />
          <Route path="checkout/:productId" element={<CheckoutPage />} />
          <Route path="order/:orderId" element={<OrderConfirmationPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
