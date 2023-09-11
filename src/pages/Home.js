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
  const [orgList, setOrgList] = useState([]);


  let [offset, setOffset] = useState(0)
  let [limit, setLimit] = useState(0)

  let [offsetLast, setOffsetLast] = useState(0)
  let [limitLast, setLimitLast] = useState(0)
  let [orgName, setOrgName] = useState('')
  let [orgNameLast, setOrgNameLast] = useState('')
  const [catValue, setCatValue] = useState('')
  const [monthValue, setMonthValue] = useState('')
  const [orgValue, setOrgValue] = useState('')
  const [yearValue, setYear] = useState(new Date().getFullYear())

  const [catValueLast, setCatValueLast] = useState('')
  const [monthValueLast, setMonthValueLast] = useState('')
  const [orgValueLast, setOrgValueLast] = useState('')
  const [yearValueLast, setYearLast] = useState(new Date().getFullYear())

  const params = {}
  const paramsLast = {}

  const handleYear = (e) => {
    setYear(e.target.value)
    setOffset(0)
    params.year = e.target.value
    params.month = monthValue
    params.category = catValue
    params.org = orgValue
    params.offset = 0
    params.limit = limit
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
      setAPIDataSoon(response.data.soon);
    });
  }

  const handleOrg = (e) => {
    setOrgValue(e.target.value)
    setOffset(0)
    setOrgName('')
    params.year = yearValue
    params.month = monthValue
    params.category = catValue
    params.org = e.target.value
    params.offset = 0
    params.limit = 4
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
      setAPIDataSoon(response.data.soon);
      response.data.orgReult ? setOrgName(response.data.orgReult[0]['name']) : setOrgName('')
    });
  }

  const handleMonth = (e) => {
    setMonthValue(e.target.value)
    setOffset(0)
    params.year = yearValue
    params.month = e.target.value
    params.category = catValue
    params.org = orgValue
    params.offset = 0
    params.limit = 4
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
      setAPIDataSoon(response.data.soon);
    });
  }

  const handleChange = (value) => {
    setCatValue(value)
    setOffset(0)
    params.year = yearValue
    params.month = monthValue
    params.category = value
    params.org = orgValue
    params.offset = 0
    params.limit = 4
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
      setAPIDataSoon(response.data.soon);
    });
  }

  const handleMonthLast = (e) => {
    setMonthValueLast(e.target.value)
    setOffsetLast(0)
    paramsLast.year = yearValueLast
    paramsLast.month = e.target.value
    paramsLast.category = catValueLast
    paramsLast.org = orgValueLast
    paramsLast.offset = 0
    paramsLast.limit = 4
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/last/${JSON.stringify(paramsLast)}`).then((response) => {
      setAPIDataLast(response.data.last);
    });
  }

  const handleOrgLast = (e) => {
    setOrgValueLast(e.target.value)
    setOffset(0)
    setOrgNameLast('')
    paramsLast.year = yearValue
    paramsLast.month = monthValue
    paramsLast.category = catValue
    paramsLast.org = e.target.value
    paramsLast.offset = 0
    paramsLast.limit = 4
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/last/${JSON.stringify(paramsLast)}`).then((response) => {
      setAPIDataLast(response.data.last);
      response.data.orgReult ? setOrgNameLast(response.data.orgReult[0]['name']) : setOrgNameLast('')
    });
  }

  const handleYearLast = (e) => {
    setYear(e.target.value)
    setOffsetLast(0)
    paramsLast.year = e.target.value
    paramsLast.month = monthValueLast
    paramsLast.category = catValueLast
    paramsLast.org = orgValueLast
    paramsLast.offset = 0
    paramsLast.limit = 4

    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/last/${JSON.stringify(paramsLast)}`).then((response) => {
      setAPIDataLast(response.data.last);
    });
  }

  const handleChangeLast = (value) => {
    setCatValueLast(value)
    setOffsetLast(0)
    paramsLast.year = yearValueLast
    paramsLast.month = monthValueLast
    paramsLast.category = value
    paramsLast.org = orgValueLast
    paramsLast.offset = 0
    paramsLast.limit = 4
    axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/last/${JSON.stringify(paramsLast)}`).then((response) => {
      setAPIDataLast(response.data.last);
    });

  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/events`).then((response) => {
      setAPIDataSoon(response.data.soon);
      setAPIDataLast(response.data.last);
      setOrgList(response.data.orgList);
    });
  }, []);


  const moreSoon = () => {

    if (offset == 0) {
      setOffset(4)
      setLimit(4)
      params.offset = 4
      params.limit = 4
      params.year = yearValue
      params.month = monthValue
      params.category = catValue
      params.org = orgValue

      axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
        if (response.data.soon.length > 0) {
          let result = Array.from(new Set([...response.data.soon, ...APIDataSoon]));
          console.log(result)
          setAPIDataSoon(result)
        }

      });


    } else {
      offset += 4;

      setOffset(offset)

      params.offset = offset
      params.limit = 4
      params.year = yearValue
      params.month = monthValue
      params.category = catValue
      params.org = orgValue

      axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/${JSON.stringify(params)}`).then((response) => {
        if (response.data.soon.length > 0) {
          let result = Array.from(new Set([...response.data.soon, ...APIDataSoon]));

          setAPIDataSoon(result)
        }
      });
    }

  }

  const moreLast = () => {

    if (offsetLast == 0) {
      setOffsetLast(4)
      setLimitLast(4)
      paramsLast.offset = 4
      paramsLast.limit = 4
      paramsLast.year = yearValueLast
      paramsLast.month = monthValueLast
      paramsLast.category = catValueLast

      axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/last/${JSON.stringify(paramsLast)}`).then((response) => {

        if (response.data.last.length > 0) {
          let result = Array.from(new Set([...response.data.last, ...APIDataLast]));
          setAPIDataLast(result)

        }
      });

    } else {
      offsetLast += 4;
      setOffsetLast(offsetLast)

      paramsLast.offset = offsetLast
      paramsLast.limit = 4
      paramsLast.year = yearValueLast
      paramsLast.month = monthValueLast
      paramsLast.category = catValueLast
      axios.get(`${process.env.REACT_APP_BASE_URL}/events/cat/last/${JSON.stringify(paramsLast)}`).then((response) => {
        if (response.data.last.length > 0) {
          let result = Array.from(new Set([...response.data.last, ...APIDataLast]));
          setAPIDataLast(result)
        }
      });
    }

  }


  const empryData = () => {

    return (
      <h3>Нет записей</h3>
    )

  }

  return (
    <>
      <Header />

      <main className="main">
        <h1 className="visually-hidden">Мероприятия</h1>
        <div className="container">
          <div className="old_version">
            <a className="old_version_link" href="https://statipkro.ru/" target="_blank"> Старая версия сайта </a>

          </div>
        </div>
        <div className="container">
          <div className="main__header">
            <h2 className="home-content__title">Скоро</h2>
            <article className="filters">
              <div className="filters__wrapper">
                <div className="filters__header">
                  <select name="year" id="year" className="filters__select" onChange={handleYear}>
                    <option value="2023" className="filters__option">2023</option>
                    <option value="2022" className="filters__option">2022</option>
                  </select>

                  <select name="month" id="month_id" className="filters__select" onChange={handleMonth}>
                    <option value="" className="filters__option"> Месяц</option>
                    {
                      getMonthList.map((el) => {
                        return (
                          <option key={el.id} value={el.id} className="filters__option">{el.name}</option>
                        )
                      })
                    }
                  </select>

                  <select name="org" id="org_id" className="filters__select" onChange={handleOrg}>
                    <option value="" className="filters__option">Организация</option>
                    {
                      orgList.map((el) => {
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
          </div>
        </div>



        <div className="events__container">
          <h3 className="event__organization_title">{orgName}</h3>
        </div>
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
              })
                :
                empryData()
            }



          </div>
          <div className="moreList" onClick={moreSoon}> Загрузить еще</div>




        </div>

        <div className="container">
          <div className="main__header">
            <h2 className="home-content__title">Прошедшие мероприятия</h2>

            <article className="filters">

              <div className="filters__wrapper">
                <div className="filters__header">
                  <select name="year" id="year" className="filters__select" onChange={handleYearLast}>
                    <option value="2023" className="filters__option">2023</option>
                    <option value="2022" className="filters__option">2022</option>
                  </select>

                  <select name="month" id="month_id" className="filters__select" onChange={handleMonthLast}>
                    <option value="" className="filters__option">Месяц</option>
                    {
                      getMonthList.map((el) => {
                        return (
                          <option key={el.id} value={el.id} className="filters__option">{el.name}</option>
                        )
                      })
                    }
                  </select>

                  <select name="org" id="org_id" className="filters__select" onChange={handleOrgLast}>
                    <option value="" className="filters__option">Организация</option>
                    {
                      orgList.map((el) => {
                        return (
                          <option key={el.id} value={el.id} className="filters__option">{el.name}</option>
                        )
                      })
                    }
                  </select>
                  <SelectFilter onChange={handleChangeLast} />
                </div>
              </div>
            </article>
          </div>
          <div className="events__container">
            <h3 className="event__organization_title">{orgNameLast}</h3>
          </div>
        </div>

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
          <div className="moreList" onClick={moreLast}> Загрузить еще</div>
        </div>
      </main>
      ;
    </>
  );
};

export default Home;