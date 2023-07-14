import React, { useState, useEffect } from "react";
import axios from "axios";
import Events from "../components/events/Events";
import SelectFilter from "../components/filter/selectFilter/SelectFilter";
import InputSearch from "../components/filter/inputSearch/InputSearch";
import Header from "./../components/header/Header";
import { events } from "../helpers/eventListActual";
import { eventsLast } from "../helpers/eventListLast";

const Home = () => {
  const [APIDataSoon, setAPIDataSoon] = useState([]);
  const [APIDataLast, setAPIDataLast] = useState([]);
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

  const filterSelect = (category) => {
    setSelectOption(category);
    if (category !== "") {
      const selectResult = APIDataSoon.filter((item) => {
        if (item.id === parseInt(category)) {
          return item;
        }
      });
      console.log("before");
      console.log(selectResult);
      setFilteredResults(selectResult);
      console.log("after");
    } else {
      setFilteredResults(APIDataSoon);
    }
  };

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
            <SelectFilter func={filterSelect} />
            <InputSearch val={searchItems} />
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
                    // img={event.img}
                    img={`${process.env.REACT_APP_BASE_IMG_URL}/${event.picture_name}`}
                    date_event={event.date_event}
                  />
                );
              }) :
                empryData()
            }



            {/* {searchInput.length > 1 || selectOption.length > 0
              ? filteredResults.map((elem) => {
                return elem.title;
              })
              : APIData.map((elem) => {
                return elem.title;
              })} */}
          </div>
          {/* {APIData.length === 0} */}
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
                  // img={event.img}
                  img={`${process.env.REACT_APP_BASE_IMG_URL}/${event.picture_name}`}
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
