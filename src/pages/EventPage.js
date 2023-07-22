import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import generationDate from './../utils/generationDate'
import generationTime from './../utils/generationTime'
import Header from "../components/header/Header";
import Event from '../components/event/Event';


const EventPage = () => {
  const { id } = useParams()

  const [EventData, setEventData] = useState([])
  const [SpeakersData, setSpeakersData] = useState([])
  const [EnrollersData, setEnrollersData] = useState([])
  const [APIdt, setAPIdt] = useState('');
  const [APIhour, setAPIhour] = useState('');

  const getAPIData = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/event/${id}`);

    setEventData(data['event'][0])
    setSpeakersData(data['speakers'])
    setEnrollersData(data['enrollers'][0])

    setAPIdt(generationDate(data['event'][0].date_event, true))
    setAPIhour(generationTime(data['event'][0].date_event))
  }

  useEffect(() => {
    try {
      getAPIData(id)
    } catch (e) {
      console.log(e.message);
    }
  }, [])
  return (
    <>
      <Header />
      <main className="main">
        <Event id={id}
          hour={APIhour}
          date={APIdt}
          description={EventData.description}
          participants_number={EventData.participants_number}
          location1={EventData.location}
          target_audience={EventData.target_audience}
          event_status={EventData.event_status}
          speakers={SpeakersData}
          enrollers={EnrollersData}
          picture_name={EventData.picture_name}
        />
      </main>
    </>
  );
};

export default EventPage;
