import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import generationDate from './../utils/generationDate'
import generationTime from './../utils/generationTime'
import Header from "../components/header/Header";
import Event from '../components/event/Event';


const EventPage = () => {
  const { id } = useParams()

  const [APIData, setAPIData] = useState([])
  const [APIdt, setAPIdt] = useState('');
  const [APIhour, setAPIhour] = useState('');

  const getAPIData = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/event/${id}`);
    setAPIData(data[0])
    setAPIdt(generationDate(data[0].date_event, true))
    setAPIhour(generationTime(data[0].date_event))
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
          description={APIData.description}
          participants_number={APIData.participants_number}
          location1={APIData.location}
          target_audience={APIData.target_audience}
        />
      </main>
    </>
  );
};

export default EventPage;
