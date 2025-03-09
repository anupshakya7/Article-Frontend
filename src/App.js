import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Articles from './components/Articles/Articles';
import SingleArticles from './components/Articles/SingleArticles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Articles/>}/>
        <Route path='/article/:slug' element={<SingleArticles/>}/>
      </Routes>
    </Router>
  );
}

export default App;
