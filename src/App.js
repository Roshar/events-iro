import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer'

import Home from './pages/Home';
import EventPage from './pages/EventPage'
import RegisterPage from './pages/RegisterPage'
import RegisteredPage from './pages/RegisteredPage'
import './styles/reset.css';
import './styles/normalize.css';
import './styles/main.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/register/:id" element={<RegisterPage />} />
          <Route path="/registered/:id" element={<RegisteredPage />} />
        </Routes>
      </Router>
      <Footer />
    </div >
  );
}

export default App;
