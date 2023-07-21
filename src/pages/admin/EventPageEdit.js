import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import fileImg from '../../img/icons/upload-to-cloud-svgrepo-com.svg'

import Header from "../../components/header/Header";
import AdminMenu from "../../components/adminMenu/AdminMenu";

const EventPageEdit = () => {

  const navigate = useNavigate()
  const { id } = useParams();

  const [notification, setNotification] = useState({})
  const [event, setEvent] = useState([]);
  const [catList, setCatList] = useState([]);
  const [organizationsList, setOrganizationsList] = useState([]);
  const [speakersList, setSpeakersList] = useState([]);
  const [filterSpeakers, setFilterSpeakers] = useState([]);
  const [filterCurrentSpeakers, setFilterCurrentSpeakers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [parNumber, setParNumber] = useState("");
  const [statusPub, setStatusPub] = useState("");
  const [file, setFile] = useState({
    preview: fileImg,
    data: ''
  });
  const [speakersCurrent, setSpeakersCurrent] = useState([]);

  const getAllSpeakers = (allList, currentList) => {
    const res = allList.filter((el) => {
      return !currentList.some((item) => item["speakers_id"] === el.id);
    });
    setFilterSpeakers(res);
  };

  const changeSpeakers = (e) => {

    e.preventDefault();

    const speakerId = parseInt(e.target.getAttribute("data-speaker-id"));
    const category = e.target.id;

    if (category === 'notAssigned') {

      const newFillter = filterSpeakers.filter((el) => {
        return el['id'] !== speakerId
      })

      const newCurrent = speakersList.filter((e) => {
        return e['id'] === speakerId
      })

      newCurrent[0]['speakers_id'] = speakerId;

      speakersCurrent.push(newCurrent[0])

      setFilterSpeakers(newFillter)

    } else if (category === 'assigned') {

      const newCurrent = speakersCurrent.filter((el) => {
        return el['speakers_id'] !== speakerId
      })
      const newFillter = speakersList.filter((e) => {
        return e['id'] === speakerId
      })

      filterSpeakers.push(newFillter[0])

      setSpeakersCurrent(newCurrent)
      setFilterSpeakers(filterSpeakers)

    }



    //   const res2 = filterSpeakers.filter((e) => {
    //     return e['id'] !== speakerId
    //   })

    //   console.log('общий список')
    //   console.log(res2)

    //   setFilterSpeakers(res2)

    //   const res = speakersList.filter((e) => {
    //     return e['id'] === speakerId
    //   })

    //   speakersCurrent.push(res[0]);
    //   setSpeakersCurrent(speakersCurrent)


    // } else if (category === "assigned") {

    //   const res = speakersCurrent.filter((el) => {

    //     if (el["speakers_id"] === speakerId) {
    //       return speakerId !== el["speakers_id"];
    //     }

    //   });
    //   console.log('назначенный список')
    //   console.log(res)


    //   setSpeakersCurrent(res);

    //   const res2 = speakersList.filter((e) => {
    //     return e['id'] === speakerId
    //   })
    //   filterSpeakers.push(res2[0])
    //   setFilterSpeakers(filterSpeakers)

    // }

    // getAllSpeakers();
  };

  const submitFunc = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', id)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category_id', categoryId)
    formData.append('organization_id', orgId)
    formData.append('date_event', dateEvent)
    formData.append('date_time', time)
    formData.append('location', location)
    formData.append('target_audience', target)
    formData.append('participants_number', parNumber)
    formData.append('event_status', statusPub)
    formData.append('speakersCurrent', speakersCurrent)

    formData.append('file', file.data)

    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/event/edit/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    navigate(`/admin`)
    console.log(data);
    data.display = 'vissible'
    data.displayText = 'X'
    localStorage.setItem('update', JSON.stringify(data))

  }


  const imgClick = () => {
    document.querySelector('#fileBtn').click();
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin/event/edit/${id}`)
      .then((response) => {
        setEvent(response.data.events);
        setCatList(response.data.list);
        setOrganizationsList(response.data.listOrg);
        setSpeakersList(response.data.speakersList);

        setTitle(response.data.events[0].title);
        setDescription(response.data.events[0].description);
        setCategoryId(response.data.events[0].category_id);
        setCategoryId(response.data.events[0].category_id);
        setOrgId(response.data.events[0].organization_id);
        setDateEvent(response.data.events[0].date_event);
        setTime(response.data.events[0].time_event);
        setLocation(response.data.events[0].location);
        setTarget(response.data.events[0].target_audience);
        setParNumber(response.data.events[0].participants_number);
        setStatusPub(response.data.events[0].event_status);

        getAllSpeakers(
          response.data.speakersList,
          response.data.speakersForEvent
        );

        setSpeakersCurrent(response.data.speakersForEvent);

      });
  }, []);


  // document.querySelector('[name="ms2_action"]').click();


  // function handleChange(e) {
  //   console.log(e.target.files);
  //   setFile(e.target.files[0]);
  // }

  function handleChange(e) {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setFile(img);
  }

  return (
    <>
      <Header />

      <main className="main main--admin">
        <AdminMenu />
        <div className="container">
          <div className="admin_event">

            <form className="admin_event__form" encType="multipart/form-data">

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="title">
                  Наименование мероприятия:
                </label>
                <input
                  className="admin_event__input"
                  type="text"
                  id="title"
                  name="title"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="description">
                  Краткое описание:
                </label>
                <textarea
                  className="admin_event__area"
                  type="text"
                  id="description"
                  name="description"
                  rows="9"
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="category_id">
                  Категория мероприятия:{" "}
                </label>
                <select
                  className="admin_event__select"
                  name="category_id"
                  id="category_id"
                  onChange={e => setCategoryId(e.target.value)}
                >
                  {catList.map((el) => {
                    return (
                      <option
                        className="admin_event__option"
                        key={el.id}
                        value={el.id}
                        selected={el.id == categoryId}
                      >
                        {" "}
                        {el.cat_name}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="organization_id">
                  {" "}
                  Организация:{" "}
                </label>
                <select
                  className="admin_event__select"
                  name="organization_id"
                  id="organization_id"
                  onChange={e => setOrgId(e.target.value)}
                >
                  {organizationsList.map((el) => {
                    return (
                      <option
                        className="admin_event__option"
                        key={el.id}
                        value={el.id}
                        selected={el.id == orgId}
                      >
                        {" "}
                        {el.name}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="date_event">
                  Дата проведения:
                </label>
                <input
                  className="admin_event__input"
                  type="date"
                  id="date_event"
                  name="date_event"
                  value={dateEvent}
                  min="2023-01-01"
                  max="2024-12-31"
                  onChange={e => setDateEvent(e.target.value)}
                />
              </div>

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="time_event">
                  Время проведения:
                </label>
                <input
                  className="admin_event__input"
                  type="time"
                  id="time_event"
                  name="time_event"
                  onChange={e => setTime(e.target.value)}
                  value={time}
                />
              </div>

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="date_event">
                  Место проведения:
                </label>
                <input
                  className="admin_event__input"
                  type="text"
                  id="location"
                  name="location"
                  onChange={e => setLocation(e.target.value)}
                  value={location}
                />
              </div>

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="target_audience">
                  Целевая аудитория:
                </label>
                <input
                  className="admin_event__input"
                  type="text"
                  id="target_audience"
                  name="target_audience"
                  onChange={e => setTarget(e.target.value)}
                  value={target}
                />
              </div>

              <div className="admin_event__form-control">
                <label
                  className="admin_event__label"
                  htmlFor="participants_number"
                >
                  Рассчитано на количество человек:
                </label>
                <input
                  className="admin_event__input"
                  type="text"
                  id="participants_number"
                  name="participants_number"
                  onChange={e => setParNumber(e.target.value)}
                  value={parNumber}
                />
              </div>

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="event_status">
                  Выбрать спикеров:{" "}
                </label>
                <div className="admin_event__list-wrapper">
                  <ul className="admin_event__list list-reset">
                    {filterSpeakers.map((el) => {
                      return (
                        <li className="admin_event__item admin_event__item--active" key={el.id}>
                          <div className="admin_event__item-data">
                            {el.surname} {el.firstname}
                          </div>
                          <button
                            className="admin_event__btn btn btn--admin-add "
                            data-speaker-id={el.id}
                            type="button"
                            id="notAssigned"
                            onChange={handleChange}
                            onClick={changeSpeakers}
                          >
                            Добавить
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="admin_event__list list-reset">
                    {speakersCurrent.map((el) => {
                      return (
                        <li className="admin_event__item admin_event__item--disable" key={el['speakers_id']}>
                          <div className="admin_event__item-data">
                            {el.surname} {el.firstname}
                          </div>
                          <button
                            className="admin_event__btn btn btn--admin-del"
                            data-speaker-id={el['speakers_id']}
                            type="button"
                            id="assigned"
                            onChange={handleChange}
                            onClick={changeSpeakers}
                          >
                            Удалить
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="admin_event__form-control">
                <label className="admin_event__label" htmlFor="event_status">
                  Статус публикации:{" "}
                </label>
                <select
                  className="admin_event__select"
                  name="event_status"
                  id="event_status"
                  onChange={handleChange}
                >
                  <option
                    className="admin_event__option"
                    value="1"
                    key={1}
                    selected={1 == statusPub}
                  >
                    {" "}
                    Опубликованно{" "}
                  </option>
                  <option
                    className="admin_event__option"
                    value="2"
                    key={2}
                    selected={2 == statusPub}
                  >
                    {" "}
                    Неопубликовано{" "}
                  </option>
                </select>
              </div>

              <div className="admin_event__form-control">
                <div className="admin_event__img img_event">
                  <div className="img_event__text">
                    <h2>Добавить изображение:</h2>
                    <input className="img_event__input" id="fileBtn" type="file" name="file" onChange={handleChange} />
                    <span className="img_event__span">Если не добавить изображение, фон будет выбран по умолчанию</span>
                  </div>
                  <img className='img_event__box' onClick={imgClick} src={file.preview} />
                </div>

              </div>

              <div className="admin_event__form-control-submit">
                <button className="admin_event__submit btn" onClick={submitFunc} type="submit">
                  Обновить
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventPageEdit;
