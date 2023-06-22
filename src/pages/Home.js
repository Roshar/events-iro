
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Events from "../components/events/Events";
import Filters from './../components/filter/Filter';
import Header from './../components/header/Header';
import { events } from '../helpers/eventListActual';
import { eventsLast } from '../helpers/eventListLast';







const Home = () => {
    const [APIData, setAPIData] = useState([])
    useEffect(() => {
        axios.get(`https://my-json-server.typicode.com/typicode/demo/posts`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, [])
    return (
        <>
            <Header />
            <Filters />
            <main className="main">
                <h1 className="visually-hidden">Мероприятия</h1>
                <h2 className="home-content__title">
                    Скоро
                </h2>
                <div className="events">
                    <div className="events__container">
                        {events.map((event) => {
                            return <Events key={event.id} id={event.id} category_name={event.category_name} statusText={event.statusText} title={event.title} img={event.img} date_event={event.date_event} />
                        })}
                        {APIData.map((item) => {
                            return (
                                (item.title)
                            )
                        })}
                    </div>
                </div>

                <h2 className="home-content__title">
                    Прошедшие мероприятия
                </h2>
                <div className="events">
                    <div className="events__container">
                        {eventsLast.map((event) => {
                            return <Events key={event.id} id={event.id} category_name={event.category_name} statusText={event.statusText} title={event.title} img={event.img} date_event={event.date_event} status_event='last' />
                        })}
                    </div>
                </div>

            </main>;
        </>
    )
}

export default Home;