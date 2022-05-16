import {Routes, Route} from 'react-router-dom';
import Cart from './routes/Cart';
import Homepage from './routes/Homepage';
import Nav from './routes/Nav';
import ProductPage from './routes/ProductPage';


function App() {
   

  return (
    <Routes>
      <Route path='/' element={<Nav />}>
      <Route index element={<Homepage />} />
      <Route path='/:categorie/:slug' element={<ProductPage />}/>
      <Route path='/cart' element={<Cart />}/>
      
      </Route>
      
    </Routes>
  );
}

export default App;
