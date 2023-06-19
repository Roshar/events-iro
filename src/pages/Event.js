import Header from "../components/header/Header";
// import bgImage from "./../img/event_bg.jpg";

const Event = () => {
  return (
    <>
      <Header />
      <main className="main">
        <section className="event">
          <div className="event__header">
            <div className="container">
              <div className="event__short-info">
                <span className="event__date"> 12 Августа 2023, 15:00 </span>

                <button className="event__register">Зарегистрироваться</button>
                <span className="event__members">
                  Количество участников: 20
                </span>
              </div>
            </div>
          </div>
          <div className="event__body">
            <div className="container">
              <h2 className="event-content__title">Описание мероприятия</h2>
              <section className="event__description">
                Игрофикация и геймификации в образовательном процессе.
                Практические способы геймифицировать обучение. Как сделать
                обучение более инновационным. Основные аспекты игрофикации.
              </section>

              <h2 className="event-content__title">Спикеры</h2>
              <section className="event__speakers speakers">
                <ul className="speakers__list list-reset">
                  <li className="speakers__item">
                    Богданова Елена Владимировна, кандидат педагогических наук,
                    доцент, заведующая кафедрой педагогики и психологии детского
                    отдыха ФГБОУ ВО «Новосибирский государственный
                    педагогический университет, методолог, тренер по
                    геймификации, автор образовательных проектов
                  </li>
                </ul>
              </section>

              <h2 className="event-content__title">Информация о мероприятии</h2>
              <section className="event__full-info full-info">
                <ul className="full-info__list">
                  <li className="full-info__item list-reset"></li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Event;
