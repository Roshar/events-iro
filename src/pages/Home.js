import img1 from './../img/event_bg.jpg'


const Home = () => {
    return (
        <>
            <main className="main">

                <h1 className="visually-hidden">Мероприятия</h1>
                <h2 className="home-content__title">
                    Скоро
                </h2>
                <div className="events">
                    <div className="events__container">
                        <div className="event-card">
                            <div className="event-card__header">
                                <div className="event-card__category-box">
                                    <p className='event-card__category-title'>Стратегическая сессия</p>
                                </div>
                                <a href="" className="event-card__link">
                                    <img src={img1} alt="" className="event-card__img" />
                                </a>
                            </div>
                            <div className="event-card__body">
                                <span className="event-card__date">
                                    чт, 15 июня
                                </span>
                                <a className="event-card__title" href=''>
                                    Региональная олимпиада для учителей предметов естественнонаучного цикла общеобразовательных организаций Чеченской Республики
                                </a>
                                <span className="event-card__registration event-card__registration--opened">
                                    Регистрация открыта
                                </span>
                            </div>

                        </div>

                        <div className="event-card">
                            <div className="event-card__header">
                                <div className="event-card__category-box">
                                    <p className='event-card__category-title'>Стратегическая сессия</p>
                                </div>
                                <a href="" className="event-card__link">
                                    <img src={img1} alt="" className="event-card__img" />
                                </a>
                            </div>
                            <div className="event-card__body">
                                <span className="event-card__date">
                                    чт, 15 июня
                                </span>
                                <a className="event-card__title" href=''>
                                    Региональная олимпиада для учителей предметов естественнонаучного цикла общеобразовательных организаций Чеченской Республики
                                </a>
                                <span className="event-card__registration event-card__registration--opened">
                                    Регистрация открыта
                                </span>
                            </div>

                        </div>

                        <div className="event-card">
                            <div className="event-card__header">
                                <div className="event-card__category-box">
                                    <p className='event-card__category-title'>Семинар</p>
                                </div>
                                <a href="" className="event-card__link">
                                    <img src={img1} alt="" className="event-card__img" />
                                </a>
                            </div>
                            <div className="event-card__body">
                                <span className="event-card__date">
                                    чт, 15 июня
                                </span>
                                <a className="event-card__title" href=''>
                                    Геймификация педагогической повседневности
                                </a>
                                <span className="event-card__registration event-card__registration--opened">
                                    Регистрация открыта
                                </span>
                            </div>

                        </div>

                        <div className="event-card">
                            <div className="event-card__header">
                                <div className="event-card__category-box">
                                    <p className='event-card__category-title'>Стратегическая сессия</p>
                                </div>
                                <a href="" className="event-card__link">
                                    <img src={img1} alt="" className="event-card__img" />
                                </a>
                            </div>
                            <div className="event-card__body">
                                <span className="event-card__date">
                                    чт, 15 июня
                                </span>
                                <a className="event-card__title" href=''>
                                    Уроки на сцене
                                </a>
                                <span className="event-card__registration event-card__registration--opened">
                                    Регистрация открыта
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

                <h2 className="home-content__title">
                    Прошедшие мероприятия
                </h2>
                <div className="events">
                    <div className="events__container">
                        <div className="event-card">
                            <div className="event-card__header">
                                <div className="event-card__category-box">
                                    <p className='event-card__category-title'>Стратегическая сессия</p>
                                </div>
                                <a href="" className="event-card__link">
                                    <img src={img1} alt="" className="event-card__img event-card__img--last" />
                                </a>
                            </div>
                            <div className="event-card__body">
                                <span className="event-card__date">
                                    чт, 15 июня
                                </span>
                                <a className="event-card__title" href=''>
                                    Региональная олимпиада для учителей предметов естественнонаучного цикла общеобразовательных организаций Чеченской Республики
                                </a>
                                <span className="event-card__registration event-card__registration--close">
                                    Закрыто
                                </span>
                            </div>
                        </div>

                        <div className="event-card">
                            <div className="event-card__header">
                                <div className="event-card__category-box">
                                    <p className='event-card__category-title'>Стратегическая сессия</p>
                                </div>
                                <a href="" className="event-card__link">
                                    <img src={img1} alt="" className="event-card__img event-card__img--last" />
                                </a>
                            </div>
                            <div className="event-card__body">
                                <span className="event-card__date">
                                    чт, 15 июня
                                </span>
                                <a className="event-card__title" href=''>
                                    Региональная олимпиада для учителей предметов естественнонаучного цикла общеобразовательных организаций Чеченской Республики
                                </a>
                                <span className="event-card__registration event-card__registration--close">
                                    Закрыто
                                </span>
                            </div>
                        </div>

                        <div className="event-card">
                            <div className="event-card__header">
                                <div className="event-card__category-box">
                                    <p className='event-card__category-title'>Стратегическая сессия</p>
                                </div>
                                <a href="" className="event-card__link">
                                    <img src={img1} alt="" className="event-card__img event-card__img--last" />
                                </a>
                            </div>
                            <div className="event-card__body">
                                <span className="event-card__date">
                                    чт, 15 июня
                                </span>
                                <a className="event-card__title" href=''>
                                    Региональная олимпиада для учителей предметов естественнонаучного цикла общеобразовательных организаций Чеченской Республики
                                </a>
                                <span className="event-card__registration event-card__registration--close">
                                    Закрыто
                                </span>
                            </div>
                        </div>

                        <div className="event-card">
                            <div className="event-card__header">
                                <div className="event-card__category-box">
                                    <p className='event-card__category-title'>Стратегическая сессия</p>
                                </div>
                                <a href="" className="event-card__link">
                                    <img src={img1} alt="" className="event-card__img event-card__img--last" />
                                </a>
                            </div>
                            <div className="event-card__body">
                                <span className="event-card__date">
                                    чт, 15 июня
                                </span>
                                <a className="event-card__title" href=''>
                                    Региональная олимпиада для учителей предметов естественнонаучного цикла общеобразовательных организаций Чеченской Республики
                                </a>
                                <span className="event-card__registration event-card__registration--close">
                                    Закрыто
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </main>;
        </>
    )
}

export default Home;