import {Routes, Route} from 'react-router-dom';
import Homepage from './routes/Homepage';
import Nav from './routes/Nav';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Nav />}>
      <Route index element={<Homepage />} />
      </Route>
      
    </Routes>
  );
}

export default App;
