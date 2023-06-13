
import Event from "./../components/event/Event";
import Filters from './../components/filter/Filter';
import Header from './../components/header/Header';
import { events } from '../helpers/eventListActual';
import { eventsLast } from '../helpers/eventListLast';

import img1 from './../img/event_bg.jpg'

const Home = () => {
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
                            return <Event key={event.id} id={event.id} category_name={event.category_name} statusText={event.statusText} title={event.title} img={event.img} date_event={event.date_event} />
                        })}
                    </div>
                </div>

                <h2 className="home-content__title">
                    Прошедшие мероприятия
                </h2>
                <div className="events">
                    <div className="events__container">
                        {eventsLast.map((event) => {
                            return <Event key={event.id} id={event.id} category_name={event.category_name} statusText={event.statusText} title={event.title} img={event.img} date_event={event.date_event} status_event='last' />
                        })}
                    </div>
                </div>

            </main>;
        </>
    )
}

export default Home;