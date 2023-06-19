import Header from "../components/header/Header";
import avatar from "./../img/avatars/orig.jpeg";
import calendar from "./../img/icons/full_info/calendar-line-icon.svg";
import time from "./../img/icons/full_info/clock-line-icon.svg";

import location from "./../img/icons/full_info/accurate-icon.svg";
import tag from "./../img/icons/full_info/tag-line-icon.svg";
import people from "./../img/icons/full_info/business-communication-icon.svg";




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
              <section className="event__speakers speaker">
                <ul className="speaker__list list-reset">
                  <li className="speaker__item">
                    <div className="speaker__img-container">
                      <img src={avatar} alt="" className="speaker__avatar" />
                    </div>
                    <div className="speaker__text">
                      <div className="speaker__name">Богданова Елена Владимировна, </div>
                      <div className="speaker__company">ФГБОУ ВО «Новосибирский государственный
                        педагогический университет"</div>
                      <div className="speaker__position">кандидат педагогических наук,
                        доцент, заведующая кафедрой педагогики и психологии детского
                        отдыха методолог, тренер по
                        геймификации, автор образовательных проектов отдыха методолог</div>
                    </div>
                  </li>
                </ul>
              </section>

              <h2 className="event-content__title">Информация о мероприятии</h2>
              <section className="event__full-info full-info">
                <ul className="full-info__list list-reset">
                  <li className="full-info__item">
                    <div className="full-info__img-container">
                      <img src={calendar} alt="calendar" className="full-info__img" />
                    </div>
                    <div className="full-info__description">
                      <div className="full-info__head">  Дата проведения:</div>
                      <div className="full-info__body"> 29 августа, 2022</div>
                    </div>
                  </li>
                  <li className="full-info__item">
                    <div className="full-info__img-container">
                      <img src={time} alt="calendar" className="full-info__img" />
                    </div>
                    <div className="full-info__description">
                      <div className="full-info__head">  Время проведения:</div>
                      <div className="full-info__body"> 15:00</div>
                    </div>
                  </li>

                  <li className="full-info__item">
                    <div className="full-info__img-container">
                      <img src={location} alt="calendar" className="full-info__img" />
                    </div>
                    <div className="full-info__description">
                      <div className="full-info__head">  Локация:</div>
                      <div className="full-info__body"> ГБУ ДПО "ИРО ЧР"; ул. Лермонтова,2</div>
                    </div>
                  </li>

                  <li className="full-info__item">
                    <div className="full-info__img-container">
                      <img src={people} alt="calendar" className="full-info__img" />
                    </div>
                    <div className="full-info__description">
                      <div className="full-info__head"> Целевая аудитория:</div>
                      <div className="full-info__body"> педагогические работники общеобразовательных организаций и обучающиеся</div>
                    </div>
                  </li>



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
