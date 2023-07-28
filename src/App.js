import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer'

import Home from './pages/Home';
import EventPage from './pages/EventPage'
import RegisterPage from './pages/RegisterPage'
import RegisteredPage from './pages/RegisteredPage'

import HomeAdminPage from './pages/admin/Main'
import EventPageEdit from './pages/admin/EventPageEdit'
import './styles/reset.css';
import './styles/normalize.css';
import './styles/main.css';
import './styles/admin.css';
import EventPageAdd from './pages/admin/EventPageAdd';
import LoginPage from './pages/LoginPage';
import SpeakersPage from './pages/admin/speaker/SpeakersPage';
import SpeakerPage from './pages/admin/speaker/SpeakerPage';
import SpeakerPageEdit from './pages/admin/speaker/SpeakerPageEdit';
import SpeakerPageAdd from './pages/admin/speaker/SpeakerPageAdd';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/register/:id" element={<RegisterPage />} />
          <Route path="/registered/:id" element={<RegisteredPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Admin routes */}
          <Route path="/admin/event/edit/:id" element={<EventPageEdit />} />
          <Route path="/admin/event/add" element={<EventPageAdd />} />
          <Route path="/admin" element={<HomeAdminPage />} />

          <Route path="/admin/speaker/:id" element={<SpeakerPage />} />
          <Route path="/admin/speaker/edit/:id" element={<SpeakerPageEdit />} />
          <Route path="/admin/speaker/delete/:id" element={<SpeakerPageEdit />} />
          <Route path="/admin/speaker/add" element={<SpeakerPageAdd />} />

          <Route path="/admin/speakers" element={<SpeakersPage />} />



        </Routes>
      </Router>
      <Footer />
    </div >
  );
}

export default App;
