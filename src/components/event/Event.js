import "./style.css";

import { NavLink, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


import avatar from "./../../img/avatars/orig.jpeg";
import calendar from "./../../img/icons/full_info/calendar-line-icon.svg";
import time from "./../../img/icons/full_info/clock-line-icon.svg";
import location from "./../../img/icons/full_info/accurate-icon.svg";
import people from "./../../img/icons/full_info/business-communication-icon.svg";
import generationDate from './../../utils/generationDate'
import generationTime from './../../utils/generationTime'


const Event = () => {
  const { id } = useParams();
  const [APIData, setAPIData] = useState([])

  const state = useEffect(() => {

    try {
      console.log('useEffect')
      axios.get(`${process.env.REACT_APP_BASE_URL}/event/${id}`).then((response) => {
        setAPIData(response.data[0])
      })
    } catch (e) {
      console.log(e.message);
    }
  }, [])

  console.log(APIData)


  return (
    <section className="event">
      <div className="event__header">
        <div className="container">
          <div className="event__short-info">
            <span className="event__date">{generationDate(APIData.date_event, true)}, {generationTime(APIData.date_event)}</span>


            <NavLink
              className="event__register"
              aria-label="button"
              to={`/register/${id}`}
            >
              Зарегистрироваться
            </NavLink>
            <span className="event__members">Количество участников: {APIData.participants_number} </span>

          </div>
        </div>
      </div>
      <div className="event__body">
        <div className="container">
          <h2 className="event-content__title">Описание мероприятия</h2>
          <section className="event__description">
            {APIData.description}
          </section>

          <h2 className="event-content__title">Спикеры</h2>
          <section className="event__speakers speaker">
            <ul className="speaker__list list-reset">
              <li className="speaker__item">
                <div className="speaker__img-container">
                  <img src={avatar} alt="" className="speaker__avatar" />
                </div>
                <div className="speaker__text">
                  <div className="speaker__name">
                    Богданова Елена Владимировна,{" "}
                  </div>
                  <div className="speaker__company">
                    ФГБОУ ВО «Новосибирский государственный педагогический
                    университет"
                  </div>
                  <div className="speaker__position">
                    кандидат педагогических наук, доцент, заведующая кафедрой
                    педагогики и психологии детского отдыха методолог, тренер по
                    геймификации, автор образовательных проектов отдыха
                    методолог
                  </div>
                </div>
              </li>
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
                  <div className="full-info__body"> {generationDate(APIData.date_event, true)}</div>
                </div>
              </li>
              <li className="full-info__item">
                <div className="full-info__img-container">
                  <img src={time} alt="calendar" className="full-info__img" />
                </div>
                <div className="full-info__description">
                  <div className="full-info__head"> Время проведения:</div>
                  <div className="full-info__body">  {generationTime(APIData.date_event)}</div>
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
                    {APIData.location}
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
                    {APIData.target_audience}
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
