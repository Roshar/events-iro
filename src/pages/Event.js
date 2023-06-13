import Header from "../components/header/Header"
import bgImage from './../img/event_bg.jpg';

const Event = () => {
    return (
        <>
            <Header />
            <main className="main">
                <section className="event">
                    <div className="event__block-info">
                        <div className="container">
                            <div className="event__date"></div>
                            <button className="event__register">Зарегистрироваться</button>
                            <div className="event__members">
                                <span>Количество участников:</span>
                            </div>
                            <div className="event__status">

                            </div>
                        </div>
                    </div>


                </section>
            </main>

        </>);
}

export default Event;