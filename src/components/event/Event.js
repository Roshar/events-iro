import "./style.css";

import { NavLink, useParams } from "react-router-dom";


import calendar from "./../../img/icons/full_info/calendar-line-icon.svg";
import time from "./../../img/icons/full_info/clock-line-icon.svg";
import location from "./../../img/icons/full_info/accurate-icon.svg";
import people from "./../../img/icons/full_info/business-communication-icon.svg";



const Event = ({ id, date, hour, participants_number, description, speakers, event_status, location1, target_audience }) => {

  const setBtnStatus = (status) => {
    if (status === 1) {
      return <NavLink
        className="event__register"
        aria-label="button"
        to={`/register/${id}`}
      >
        Зарегистрироваться
      </NavLink>
    } else {
      return <button
        className="event__register"
        aria-label="button"
        disabled
      >
        Регистрация закрыта
      </button>
    }
  }
  return (
    <section className="event">
      <div className="event__header">
        <div className="container">
          <div className="event__short-info">
            <span className="event__date">{date}, {hour}</span>

            {setBtnStatus(event_status)}

            <span className="event__members">Количество участников: {participants_number ?? 0} </span>

          </div>
        </div>
      </div>
      <div className="event__body">
        <div className="container">
          <h2 className="event-content__title">Описание мероприятия</h2>
          <section className="event__description">
            {description}
          </section>

          <h2 className="event-content__title">Спикеры</h2>
          <section className="event__speakers speaker">
            <ul className="speaker__list list-reset">

              {speakers.map((speaker) => {
                return (
                  <li key={speaker.id} className="speaker__item">
                    <div className="speaker__img-container">
                      <img src={`${process.env.REACT_APP_BASE_IMG_URL}/avatars/${speaker.avatar}`} alt="" className="speaker__avatar" />
                    </div>
                    <div className="speaker__text">
                      <div className="speaker__name">
                        {`${speaker.surname} ${speaker.firstname} ${speaker.patronymic}`}
                      </div>
                      <div className="speaker__company">
                        {speaker.company}
                      </div>
                      <div className="speaker__position">
                        {speaker.position}
                      </div>
                    </div>
                  </li>
                )
              })}


            </ul>
          </section>

          <h2 className="event-content__title">Информация о мероприятии</h2>
          <section className="event__full-info full-info">
            <ul className="full-info__list list-reset">
              <li className="full-info__item">
                <div className="full-info__img-container">
                  <img
                    src={calendar}
                    alt="calendar"
                    className="full-info__img"
                  />
                </div>
                <div className="full-info__description">
                  <div className="full-info__head"> Дата проведения:</div>
                  <div className="full-info__body"> {date}</div>

                </div>
              </li>
              <li className="full-info__item">
                <div className="full-info__img-container">
                  <img src={time} alt="calendar" className="full-info__img" />
                </div>
                <div className="full-info__description">
                  <div className="full-info__head"> Время проведения:</div>
                  <div className="full-info__body"> {hour} </div>

                </div>
              </li>

              <li className="full-info__item">
                <div className="full-info__img-container">
                  <img
                    src={location}
                    alt="calendar"
                    className="full-info__img"
                  />
                </div>
                <div className="full-info__description">
                  <div className="full-info__head"> Локация:</div>
                  <div className="full-info__body">
                    {location1}
                  </div>
                </div>
              </li>

              <li className="full-info__item">
                <div className="full-info__img-container">
                  <img src={people} alt="calendar" className="full-info__img" />
                </div>
                <div className="full-info__description">
                  <div className="full-info__head"> Целевая аудитория:</div>
                  <div className="full-info__body">
                    {target_audience}
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Event;
