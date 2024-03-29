import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";

import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import RegisterPage from "./pages/RegisterPage";
import RegisteredPage from "./pages/RegisteredPage";
import SearchEventPage from "./pages/SearchEventPage";

import HomeAdminPage from "./pages/admin/Main";
import EventPageEdit from "./pages/admin/EventPageEdit";
import "./styles/reset.css";
import "./styles/normalize.css";
import "./styles/main.css";
import "./styles/admin.css";
import EventPageAdd from "./pages/admin/EventPageAdd";
import LoginPage from "./pages/LoginPage";
import SpeakersPage from "./pages/admin/speaker/SpeakersPage";
import SpeakerPage from "./pages/admin/speaker/SpeakerPage";
import SpeakerPageEdit from "./pages/admin/speaker/SpeakerPageEdit";
import SpeakerPageAdd from "./pages/admin/speaker/SpeakerPageAdd";
import EnrollersPage from "./pages/admin/users/EnrollersPage";
import EnrollerPage from "./pages/admin/users/EnrollerPage";
import ReportPage from "./pages/admin/report/ReportPage";
import Header from "./components/header/Header";
import EventEnrollers from "./pages/admin/EventEnrollers";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/cat/:filters" element={<Home />} />
          <Route path="/events/cat/last/:filters" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/register/:id" element={<RegisterPage />} />
          <Route path="/registered/:id" element={<RegisteredPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LoginPage />} />
          <Route path="/searchevent" element={<SearchEventPage />} />
          {/* Admin routes */}
          <Route path="/admin/event/edit/:id" element={<EventPageEdit />} />
          <Route path="/admin/event/delete/:id" element={<EventPageEdit />} />
          <Route path="/admin/event/add" element={<EventPageAdd />} />
          <Route
            path="/admin/event/show_enrollers/:id"
            element={<EventEnrollers />}
          />
          <Route
            path="/admin/event/show_enrollers_for_excel/:id"
            element={<EventEnrollers />}
          />
          <Route path="/admin/main/" element={<HomeAdminPage />} />
          <Route path="/checkRole" element={<Header />} />

          <Route path="/admin/speakers/" element={<SpeakersPage />} />

          <Route path="/admin/speaker/create" element={<SpeakerPageAdd />} />
          <Route path="/admin/speaker/:id" element={<SpeakerPage />} />
          <Route path="/admin/speaker/edit/:id" element={<SpeakerPageEdit />} />
          <Route
            path="/admin/speaker/delete/:id"
            element={<SpeakerPageEdit />}
          />
          <Route path="/admin/enroller/:id" element={<EnrollerPage />} />
          <Route path="/admin/enrollers/" element={<EnrollersPage />} />
          <Route path="/admin/enroller/delete/:id" element={<EnrollerPage />} />
          <Route path="/admin/reports" element={<ReportPage />} />
          <Route path="/admin/report/events" element={<ReportPage />} />
          <Route path="/admin/report/enrollers" element={<ReportPage />} />
          <Route
            path="/admin/report/enrollers_list "
            element={<ReportPage />}
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
