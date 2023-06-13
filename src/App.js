import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Event from './pages/Event'
import './styles/reset.css';
import './styles/normalize.css';
import './styles/main.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
