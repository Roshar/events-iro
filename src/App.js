import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Filters from './components/filter/Filter';
import Home from './pages/Home';
import './styles/reset.css';
import './styles/normalize.css';
import './styles/main.css';



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Filters />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </Router>
    </div >
  );
}

export default App;
