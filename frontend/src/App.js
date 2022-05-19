import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './routes/Cart';
import Dashboard from './routes/Dashboard';

import FinishOrderPage from './routes/FinishOrderPage';
import Homepage from './routes/Homepage';
import Nav from './routes/Nav';
import OrderHistoryPage from './routes/OrderHistoryPage';
import OrderTestPage from './routes/OrderTestPage';
import ProductPage from './routes/ProductPage';
import SearchPage from './routes/SearchPage';
import ShippingAddressPage from './routes/ShippingAddressPage';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import AdminRoute from './components/AdminRoute';
import ProductListPage from './routes/ProductListPage';
import ProductEditPage from './routes/ProductEditPage';


function App() {
   

  return (
    <Routes>
      <Route path='/' element={<Nav />}>
      <Route index element={<Homepage />} />
      <Route path='/:category/:slug' element={<ProductPage />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/search' element={<SearchPage />}/>
      
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/orderhistory' element={
      <ProtectedRoute>
      <OrderHistoryPage />
      </ProtectedRoute>} />
      <Route path='/shipping' element={<ShippingAddressPage />} />

      {/* ADMIN ROUTES */}
      <Route path='/admin/dashboard' element={
      <AdminRoute>
        <Dashboard />
      </AdminRoute>}/>
      <Route path='/admin/products' element={
      <AdminRoute>
        <ProductListPage />
      </AdminRoute>}/>
      <Route path='/admin/product/:id' element={
      <AdminRoute>
        <ProductEditPage />
      </AdminRoute>}/>
      
      
      </Route>
      
      <Route path='finish-order' element={<FinishOrderPage />}/>
      <Route path='/order/:id' element={
      <ProtectedRoute>
      <OrderTestPage />
      </ProtectedRoute>}/>
      
      
    </Routes>
  );
}

export default App;
