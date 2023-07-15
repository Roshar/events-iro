import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import AdminMenu from "../../components/adminMenu/AdminMenu";


const EventPageEdit = () => {
    const { id } = useParams()
    console.log(id)
    const [event, setEvent] = useState([])
    const [catList, setCatList] = useState([])
    const [organizationsList, setOrganizationsList] = useState([])
    const [speakersList, setSpeakersList] = useState([])


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [orgId, setOrgId] = useState('')
    const [dateEvent, setDateEvent] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [target, setTarget] = useState('')
    const [parNumber, setParNumber] = useState('')
    const [statusPub, setStatusPub] = useState('')
    const [speakersCurrent, setSpeakersCurrent] = useState('')


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/event/edit/${id}`).then((response) => {
            setEvent(response.data.events)
            setCatList(response.data.list)
            setOrganizationsList(response.data.listOrg)
            setSpeakersList(response.data.speakersList)

            setTitle(response.data.events[0].title)
            setDescription(response.data.events[0].description)
            setCategoryId(response.data.events[0].category_id)
            setCategoryId(response.data.events[0].category_id)
            setOrgId(response.data.events[0].organization_id)
            setDateEvent(response.data.events[0].date_event)
            setTime(response.data.events[0].time_event)
            setLocation(response.data.events[0].location)
            setTarget(response.data.events[0].target_audience)
            setParNumber(response.data.events[0].participants_number)
            setStatusPub(response.data.events[0].event_status)

            setSpeakersCurrent(response.data.speakersForEvent)


        });
    }, []);






    console.log(speakersCurrent);
    return (
        <>
            <Header />


            <main className="main main--admin">
                <AdminMenu />
                <div className="container">
                    <div className="admin_event">
                        <form className="admin_event__form">
                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="title" >Наименование мероприятия:</label>
                                <input className="admin_event__input" type="text" id="title" name="title" value={title} />
                            </div>
                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="description" >Краткое описание:</label>
                                <textarea className="admin_event__area" type="text" id="description" name="description" rows="9" value={description} />
                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="description" >Категория мероприятия: </label>
                                <select className="admin_event__select" name="category_id" id="category_id">
                                    {catList.map((el) => {
                                        return (
                                            <option className="admin_event__option" value={el.id} selected={el.id == categoryId}> {el.cat_name} </option>
                                        )
                                    })}

                                </select>
                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="description" > Организация: </label>
                                <select className="admin_event__select" name="category_id" id="category_id">
                                    {organizationsList.map((el) => {
                                        return (
                                            <option className="admin_event__option" value={el.id} selected={el.id == orgId}> {el.name} </option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="date_event" >Дата проведения:</label>
                                <input className="admin_event__input" type="date" id="date_event" name="date_event" value={dateEvent} min="2023-01-01" max="2024-12-31" />
                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="time_event" >Время проведения:</label>
                                <input className="admin_event__input" type="time" id="time_event" name="time_event" value={time} />
                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="date_event" >Место проведения:</label>
                                <input className="admin_event__input" type="text" id="location" name="location" value={location} />
                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="target_audience" >Целевая аудитория:</label>
                                <input className="admin_event__input" type="text" id="target_audience" name="target_audience" value={target} />
                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="participants_number" >Рассчитано на количество человек:</label>
                                <input className="admin_event__input" type="text" id="participants_number" name="participants_number" value={parNumber} />
                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="event_status" >Выбрать спикеров: </label>
                                <ul className="admin_event__list list-reset">
                                    {speakersList.map((el) => {
                                        return (

                                            <li className="admin_event__item">
                                                <div className="admin_event__item-data">
                                                    {el.surname} {el.firstname}
                                                </div>
                                                <button className="admin_event__btn btn btn--admin">Добавить</button>
                                            </li>



                                        )
                                    })}
                                </ul>

                            </div>

                            <div className="admin_event__form-control">
                                <label className="admin_event__label" htmlFor="event_status" >Статус публикации: </label>
                                <select className="admin_event__select" name="event_status" id="event_status">
                                    <option className="admin_event__option" value='1' selected={1 == statusPub}> Опубликованно </option>
                                    <option className="admin_event__option" value='2' selected={2 == statusPub}> Неопубликовано </option>
                                </select>
                            </div>






                        </form>



                    </div>
                </div>
            </main>


        </>
    );
}

export default EventPageEdit;