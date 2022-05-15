import {Routes, Route} from 'react-router-dom';
import Homepage from './routes/Homepage';
import Nav from './routes/Nav';
import ProductPage from './routes/ProductPage';


function App() {
   

  return (
    <Routes>
      <Route path='/' element={<Nav />}>
      <Route index element={<Homepage />} />
      <Route path='/:categorie/:slug' element={<ProductPage />}/>
      
      </Route>
      
    </Routes>
  );
}

export default App;
