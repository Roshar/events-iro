import { useParams } from "react-router-dom";

import Header from "../components/header/Header";
import Event from '../components/event/Event';

const EventPage = () => {
  const { id } = useParams()
  return (
    <>
      <Header />
      <main className="main">
        <Event id={id} />
      </main>
    </>
  );
};

export default EventPage;
