import {Routes, Route} from 'react-router-dom';
import Cart from './routes/Cart';
import Homepage from './routes/Homepage';
import Nav from './routes/Nav';
import OrderHistoryPage from './routes/OrderHistoryPage';
import OrderScreen from './routes/OrderScreen';
import OrderTestPage from './routes/OrderTestPage';
import ProductPage from './routes/ProductPage';
import Shipping from './routes/Shipping';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';


function App() {
   

  return (
    <Routes>
      <Route path='/' element={<Nav />}>
      <Route index element={<Homepage />} />
      <Route path='/:categorie/:slug' element={<ProductPage />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/orderhistory' element={<OrderHistoryPage />} />
      
      
      </Route>
      <Route path='/shipping' element={<Shipping />} />
      <Route path='/comanda-plasata-cu-succes' element={<OrderTestPage />}/>
      
      
    </Routes>
  );
}

export default App;
