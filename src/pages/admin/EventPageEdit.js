import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import fileImg from '../../img/icons/upload-to-cloud-svgrepo-com.svg'

import Header from "../../components/header/Header";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import checkAdminRole from './../../utils/sendHeaders';
import getCookie from './../../utils/getCookies'


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
  const [published, setPublished] = useState("");
  const [statusReg, setStatusReg] = useState("");
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

  const title_i = document.getElementById('title');
  const desc_i = document.getElementById('description');
  const cat_i = document.getElementById('category_id');
  const org_i = document.getElementById('organization_id');
  const date_i = document.getElementById('date_event');
  const time_i = document.getElementById('time_event');
  const location_i = document.getElementById('location');
  const target_i = document.getElementById('target_audience');
  const par_i = document.getElementById('participants_number');
  const speakers = document.getElementById('current_speakers');

  const checkError = () => {
    return document.querySelectorAll('.error');
  }

  const setError = (el, msg) => {
    const inputControl = el.parentElement;
    const errorDisplay = inputControl.querySelector('.notif');

    errorDisplay.innerText = msg;
    inputControl.classList.add('error');
    inputControl.classList.remove('success-i')

  }

  const setSuccess = el => {
    const inputControl = el.parentElement;
    const errorDisplay = inputControl.querySelector('.notif');

    errorDisplay.innerText = '';
    inputControl.classList.add('success-i');
    inputControl.classList.remove('error')
  }

  const validateInputs = () => {

    const titleVal = title_i.value.trim();
    const desckVal = desc_i.value.trim();
    const catVal = cat_i.value;
    const orgVal = org_i.value;
    const dateVal = date_i.value;
    const timeVal = time_i.value;
    const locationVal = location_i.value.trim();
    const targetVal = target_i.value;
    const parVal = par_i.value;


    if (titleVal === '') {
      setError(title_i, 'Поле необходимо заполнить')
    } else {
      setSuccess(title_i)
    }

    if (desckVal === '') {
      setError(desc_i, 'Поле необходимо заполнить')
    } else {
      setSuccess(desc_i)
    }

    if (catVal === '') {
      setError(cat_i, 'Необходимо выбрать категорию')
    } else {
      setSuccess(cat_i)
    }

    if (orgVal === '') {
      setError(org_i, 'Поле необходимо заполнить');
    } else {
      setSuccess(org_i);
    }

    if (dateVal === '') {
      setError(date_i, 'Поле необходимо заполнить');
    } else {
      setSuccess(date_i);
    }

    if (timeVal === '') {
      setError(time_i, 'Поле необходимо заполнить');
    } else {
      setSuccess(time_i);
    }

    if (locationVal === '') {
      setError(location_i, 'Поле необходимо заполнить');
    } else {
      setSuccess(location_i);
    }

    if (targetVal === '') {
      setError(target_i, 'Поле необходимо заполнить');
    } else {
      setSuccess(target_i);
    }

    if (parVal === '') {
      setError(par_i, 'Поле необходимо заполнить');
    } else {
      setSuccess(par_i);
    }

    if (speakersCurrent.length < 1) {
      setError(speakers, 'Необходимо добавить хотя бы одного спикера ');
    } else {
      setSuccess(speakers);
    }

  }

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

    validateInputs()

    const errorCount = checkError()

    if (errorCount.length < 1) {

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
      formData.append('event_status', statusReg)
      formData.append('published', published)
      formData.append('speakersCurrent', JSON.stringify(speakersCurrent))

      formData.append('file', file.data)
      const cookies = getCookie()

      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/event/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + cookies['token_statipkro'],
        }
      });
      navigate(`/admin`)

      data.display = 'vissible'
      data.displayText = 'X'
      localStorage.setItem('update', JSON.stringify(data))

    } else {
      alert('Заполните все поля!')
    }





  }


  const imgClick = () => {
    document.querySelector('#fileBtn').click();
  }

  const getEventPageEdit = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/event/edit/${id}`, checkAdminRole())

    if (response.data.code === 403) {
      navigate('/login')
    } else {
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
      setStatusReg(response.data.events[0].event_status);
      setPublished(response.data.events[0].published);

      getAllSpeakers(
        response.data.speakersList,
        response.data.speakersForEvent
      );

      setSpeakersCurrent(response.data.speakersForEvent);
    }

  }

  useEffect(() => {

    getEventPageEdit()

  }, []);


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
                <span className="notif" id="danger-position"> </span>
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
                <span className="notif" id="danger-position"> </span>
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
                <span className="notif" id="danger-position"> </span>
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
                <span className="notif" id="danger-position"> </span>
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
                <span className="notif" id="danger-position"> </span>
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
                <span className="notif" id="danger-position"> </span>
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
                <span className="notif" id="danger-position"> </span>
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
                <span className="notif" id="danger-position"> </span>
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
                <span className="notif" id="danger-position"> </span>
              </div>

              <div className="admin_event__form-control">

                <div className="admin_event__list-wrapper">
                  <div className="admin_event__list-side">
                    <label className="admin_event__label" htmlFor="event_status">
                      Общий список спикеро <span className="little_description">( Выбрать спикера)</span> :{" "}
                    </label>
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
                  </div>
                  <div className="admin_event__list-side">
                    <label className="admin_event__label" htmlFor="event_status">
                      Добавлены <span className="little_description">( спикеры, назначенные на мероприятия )</span>:  {" "}
                    </label>
                    <ul className="admin_event__list list-reset" id="current_speakers">
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
                    <span className="notif" id="danger-position"> </span>
                  </div>
                </div>
              </div>

              <div className="admin_event__form-control">
                <div className="admin_event__twice_element-container">
                  <div className="admin_event__twice_element">
                    <label className="admin_event__label" htmlFor="event_status">
                      Статус публикации:{" "}
                    </label>
                    <select
                      className="admin_event__select"
                      name="event_status"
                      id="event_status"
                      onChange={e => setStatusReg(e.target.value)}
                    >
                      <option
                        className="admin_event__option"
                        value="1"
                        key={1}
                        selected={1 == statusReg}
                      >
                        {" "}
                        Регистрация открыта{" "}
                      </option>
                      <option
                        className="admin_event__option"
                        value="2"
                        key={2}
                        selected={2 == statusReg}
                      >
                        {" "}
                        Регистрация закрыта{" "}
                      </option>
                    </select>

                  </div>
                  <div className="admin_event__twice_element">
                    <label className="admin_event__label" htmlFor="event_status">
                      Статус публикации:{" "}
                    </label>
                    <select
                      className="admin_event__select"
                      name="published"
                      id="published"
                      onChange={e => setPublished(e.target.value)}
                    >
                      <option
                        className="admin_event__option"
                        value="1"
                        key={1}
                        selected={1 == published}
                      >
                        {" "}
                        Опубликованно{" "}
                      </option>
                      <option
                        className="admin_event__option"
                        value="2"
                        key={2}
                        selected={2 == published}
                      >
                        {" "}
                        Снято с публикации{" "}
                      </option>
                    </select>

                  </div>
                </div>

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
