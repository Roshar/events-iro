import React, { useState, useEffect } from "react";
import axios from "axios";
import Events from "../components/events/Events";
import SelectFilter from "../components/filter/selectFilter/SelectFilter";
import InputSearch from "../components/filter/inputSearch/InputSearch";
import Header from "./../components/header/Header";
import { events } from "../helpers/eventListActual";
import { eventsLast } from "../helpers/eventListLast";
import getMonthList from "../utils/listMonth";



const Home = () => {
  const [APIDataSoon, setAPIDataSoon] = useState([]);
  const [APIDataLast, setAPIDataLast] = useState([]);
  const [catValue, setCatValue] = useState('')
  const [monthValue, setMonthValue] = useState('')
  const [yearValue, setYear] = useState(new Date().getFullYear())


  const params = {}

  const handleYear = (e) => {
    setYear(e.target.value)
    params.year = e.target.value
    params.month = monthValue
    params.category = catValue
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
    });
  }

  const handleMonth = (e) => {
    setMonthValue(e.target.value)
    params.year = yearValue
    params.month = e.target.value
    params.category = catValue
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
    });
  }

  const handleChange = (value) => {
    setCatValue(value)
    params.year = yearValue
    params.month = monthValue
    params.category = value
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
    });

  }




  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectOption, setSelectOption] = useState("");

  console.log(process.env.REACT_APP_BASE_URL);

  const state = useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/events`).then((response) => {
      setAPIDataSoon(response.data.soon);
      setAPIDataLast(response.data.last);
    });
  }, []);





  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      console.log(filteredResults);
      const filteredData = filteredResults.filter((item) => {
        return Object.values(item.title)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIDataSoon);
    }
  };



  const empryData = () => {

    return (
      <h3>Нет записей</h3>
    )

  }

  return (
    <>
      <Header />
      <article className="filters">
        <div className="filters__wrapper">
          <div className="filters__header">



            <select name="year" id="year" className="filters__select" onChange={handleYear}>
              <option value="2023" className="filters__option">2023</option>
              <option value="2022" className="filters__option">2022</option>
            </select>

            <select name="month" id="month_id" className="filters__select" onChange={handleMonth}>
              <option value="" className="filters__option">Выбрать категорию</option>
              {
                getMonthList.map((el) => {
                  return (
                    <option key={el.id} value={el.id} className="filters__option">{el.name}</option>
                  )
                })
              }
            </select>

            <SelectFilter onChange={handleChange} />




          </div>
        </div>
      </article>
      <main className="main">
        <h1 className="visually-hidden">Мероприятия</h1>
        <h2 className="home-content__title">Скоро</h2>
        <div className="events">
          <div className="events__container">
            {
              APIDataSoon.length !== 0 ? APIDataSoon.map((event) => {
                return (
                  <Events
                    key={event.id_uniq}
                    id={event.id_uniq}
                    category_name={event.cat_name}
                    statusText={event.status}
                    title={event.title}

                    img={`${process.env.REACT_APP_BASE_IMG_URL}/event_images/${event.picture_name}`}
                    date_event={event.date_event}
                  />
                );
              }) :
                empryData()
            }


          </div>

        </div>

        <h2 className="home-content__title">Прошедшие мероприятия</h2>
        <div className="events">
          <div className="events__container">
            {APIDataLast.length !== 0 ? APIDataLast.map((event) => {
              return (
                <Events
                  key={event.id_uniq}
                  id={event.id_uniq}
                  category_name={event.cat_name}
                  statusText={event.status}
                  title={event.title}

                  img={`${process.env.REACT_APP_BASE_IMG_URL}/event_images/${event.picture_name}`}
                  date_event={event.date_event}
                  status_event="last"
                />
              );
            }) :
              empryData()
            }
          </div>
        </div>
      </main>
      ;
    </>
  );
};

export default Home;
