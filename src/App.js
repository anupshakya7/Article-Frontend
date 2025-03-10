import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Articles from './components/Articles/Articles';
import SingleArticles from './components/Articles/SingleArticles';
import Navbar from './components/Navbar';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    <Navbar/>
    <div className='container mt-4'>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/article' element={<Articles/>}/>
          <Route path='/article/:slug' element={<SingleArticles/>}/>
      </Routes>
    </div>
      
    </Router>
  );
}

export default App;
