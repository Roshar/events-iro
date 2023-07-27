import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import fileImg from '../../img/icons/upload-to-cloud-svgrepo-com.svg'

import Header from "../../components/header/Header";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import checkAdminRole from './../../utils/sendHeaders'



const EventPageAdd = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const [notification, setNotification] = useState({})
    const [result, setResult] = useState({});
    const [messageNot, setMessageNot] = useState('');

    const [catList, setCatList] = useState([]);
    const [organizationsList, setOrganizationsList] = useState([]);
    const [speakersListStable, setSpeakersListStable] = useState([]);
    const [speakersList, setSpeakersList] = useState([]);
    const [speakersCurrent, setSpeakersCurrent] = useState([]);

    const [event, setEvent] = useState({
        title: "",
        description: "",
        category_id: "",
        organization_id: "",
        dateEvent: "",
        date_event: "",
        time_event: "",
        location: "",
        target_audience: "",
        participants_number: "",
        event_status: "",
        published: "",
        speakers: speakersCurrent
    })

    const [file, setFile] = useState({
        preview: fileImg,
        data: ''
    });

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

    const changeSpeakersList = (e) => {
        e.preventDefault();

        const speakerId = parseInt(e.target.getAttribute("data-speaker-id"));
        const category = e.target.id;

        if (category === 'notAssigned') {

            const newList = speakersList.filter((el) => {
                return el['id'] !== speakerId
            })

            const newSpeaker = speakersList.filter((el) => {
                return el['id'] === speakerId
            })

            setSpeakersList(newList)
            newSpeaker[0]['speakers_id'] = speakerId;

            speakersCurrent.push(newSpeaker[0])
            setSpeakersCurrent(speakersCurrent)


        } else if (category === 'assigned') {

            const newSpeaker = speakersCurrent.filter((el) => {
                return el['speakers_id'] !== speakerId
            })

            setSpeakersCurrent(newSpeaker)

            const newList = speakersListStable.filter((el) => {
                return el['id'] === speakerId;
            })

            speakersList.push(newList[0])
            setSpeakersList(speakersList)


            // const newCurrent = speakersCurrent.filter((el) => {
            //     return el['speakers_id'] !== speakerId
            // })
            // const newFillter = speakersList.filter((e) => {
            //     return e['id'] === speakerId
            // })

            // speakersCurrent.push(newFillter[0])

            // setSpeakersCurrent(newCurrent)
            // setSpeakersList(speakersCurrent)

        }



    }

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


    const submitFunc1 = async (e) => {

        e.preventDefault()
        validateInputs()
        const errorCount = checkError()
        console.log(errorCount.length)

        if (errorCount.length < 1) {

            try {
                const formData = new FormData()
                formData.append('event', JSON.stringify(event))
                formData.append('file', file.data)

                const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/event/add`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token_statipkro'),
                    }
                });

                navigate(`/admin`)
                console.log(data);
                data.display = 'vissible'
                data.displayText = 'X'
                localStorage.setItem('update', JSON.stringify(data))


            } catch (err) {
                console.log(err.message)
            }
        }
    }


    const imgClick = () => {
        document.querySelector('#fileBtn').click();
    }

    const getEventPageAdd = async () => {
        const response = await
            axios.get(`${process.env.REACT_APP_BASE_URL}/admin/event/add`, checkAdminRole())
        if (response.data.code === 403) {
            navigate('/login')
        } else {
            setSpeakersListStable(
                response.data.speakers
            );
            setSpeakersList(
                response.data.speakers
            );
            setOrganizationsList(response.data.organizations)
            setCatList(response.data.cat)
        }
    }


    useEffect(() => {
        getEventPageAdd()
    }, []);


    const handleChange = (e) => {

        setEvent(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }


    function handleChangeImage(e) {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setFile(img);
    }

    return (<>
        <Header />

        <main className="main main--admin">
            <AdminMenu />
            <div className="container">
                <div className="admin_event">

                    <form className="admin_event__form" encType="multipart/form-data">

                        <div className="admin_event__form-control">
                            <label className="admin_event__label" htmlFor="title">
                                <span className="register__required">*</span> Наименование мероприятия:
                            </label>
                            <input
                                className="admin_event__input"
                                type="text"
                                id="title"
                                name="title"
                                onChange={handleChange}
                                required='required'
                            />
                            <span className="notif" id="danger-position"></span>
                        </div>

                        <div className="admin_event__form-control">
                            <label className="admin_event__label" htmlFor="description">
                                <span className="register__required">*</span> Краткое описание:
                            </label>

                            <textarea
                                className="admin_event__area"
                                type="text"
                                id="description"
                                name="description"
                                rows="9"
                                onChange={handleChange}

                            />
                            <span className="notif" id="danger-position"></span>
                        </div>

                        <div className="admin_event__form-control">
                            <label className="admin_event__label" htmlFor="category_id">
                                <span className="register__required">*</span>  Категория мероприятия:{" "}
                            </label>
                            <select
                                className="admin_event__select"
                                name="category_id"
                                id="category_id"
                                onChange={handleChange}
                            >
                                <option
                                    className="admin_event__option"
                                    value=''
                                >
                                    не выбрано
                                </option>
                                {catList.map((el) => {
                                    return (
                                        <option
                                            className="admin_event__option"
                                            key={el.id}
                                            value={el.id}
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
                                <span className="register__required">*</span> Организация: <span className="little_description">(Укажите какая организация проводит мероприятие)</span>{" "}
                            </label>
                            <select
                                className="admin_event__select"
                                name="organization_id"
                                id="organization_id"
                                onChange={handleChange}
                            >
                                <option
                                    className="admin_event__option"
                                    value=''
                                >
                                    не выбрано
                                </option>
                                {organizationsList.map((el) => {
                                    return (
                                        <option
                                            className="admin_event__option"
                                            key={el.id}
                                            value={el.id}

                                        >
                                            {" "}
                                            {el.name}{" "}
                                        </option>
                                    );
                                })}
                            </select>
                            <span className="notif" id="danger-position"></span>
                        </div>

                        <div className="admin_event__form-control">
                            <label className="admin_event__label" htmlFor="date_event">
                                <span className="register__required">*</span> Дата проведения:
                            </label>
                            <input
                                className="admin_event__input"
                                type="date"
                                id="date_event"
                                name="date_event"
                                min="2023-01-01"
                                max="2024-12-31"
                                onChange={handleChange}
                            />
                            <span className="notif" id="danger-position"></span>
                        </div>

                        <div className="admin_event__form-control">
                            <label className="admin_event__label" htmlFor="time_event">
                                <span className="register__required">*</span>   Время проведения:
                            </label>
                            <input
                                className="admin_event__input"
                                type="time"
                                id="time_event"
                                name="time_event"
                                onChange={handleChange}

                            />
                            <span className="notif" id="danger-position"></span>
                        </div>

                        <div className="admin_event__form-control">
                            <label className="admin_event__label" htmlFor="date_event">
                                <span className="register__required">*</span>   Место проведения: <span className="little_description">(Укажите адрес, где будет проходить мероприятие )</span>
                            </label>
                            <input
                                className="admin_event__input"
                                type="text"
                                id="location"
                                name="location"
                                onChange={handleChange}

                            />
                            <span className="notif" id="danger-position"></span>
                        </div>

                        <div className="admin_event__form-control">
                            <label className="admin_event__label" htmlFor="target_audience">
                                <span className="register__required">*</span>   Целевая аудитория:
                            </label>
                            <input
                                className="admin_event__input"
                                type="text"
                                id="target_audience"
                                name="target_audience"
                                onChange={handleChange}

                            />
                            <span className="notif" id="danger-position"></span>
                        </div>

                        <div className="admin_event__form-control">
                            <label
                                className="admin_event__label"
                                htmlFor="participants_number"
                            >
                                <span className="register__required">*</span> Рассчитано на количество человек: <span className="little_description">(Укажите число)</span>
                            </label>
                            <input
                                className="admin_event__input"
                                type="text"
                                id="participants_number"
                                name="participants_number"
                                onChange={handleChange}

                            />
                            <span className="notif" id="danger-position"></span>
                        </div>

                        <div className="admin_event__form-control">

                            <div className="admin_event__list-wrapper">
                                <div className="admin_event__list-side">
                                    <label className="admin_event__label" htmlFor="admin_event__speakers">
                                        <span className="register__required">*</span> Выбрать спикеров:{" "}
                                    </label>

                                    <ul className="admin_event__list list-reset">
                                        {speakersList.map((el) => {
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
                                                        onClick={changeSpeakersList}
                                                    >
                                                        Добавить
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div className="admin_event__list-side">
                                    <label className="admin_event__label" htmlFor="admin_event__speakers">
                                        Выбрано:{" "}
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
                                                        onClick={changeSpeakersList}
                                                    >
                                                        Удалить
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <span className="notif" id="danger-position"></span>
                                </div>

                            </div>

                        </div>

                        <div className="admin_event__form-control">
                            <div className="admin_event__twice_element-container">
                                <div className="admin_event__twice_element">
                                    <label className="admin_event__label" htmlFor="event_status">
                                        Статус регистрации на мероприятие:{" "}
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

                                        >
                                            {" "}
                                            Регистрация открыта{" "}
                                        </option>
                                        <option
                                            className="admin_event__option"
                                            value="2"
                                            key={2}

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
                                        onChange={handleChange}
                                    >
                                        <option
                                            className="admin_event__option"
                                            value="1"
                                            key={1}
                                        >
                                            {" "}
                                            Опубликованно{" "}
                                        </option>
                                        <option
                                            className="admin_event__option"
                                            value="2"
                                            key={2}

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
                                    <input className="img_event__input" id="fileBtn" type="file" name="file" onChange={handleChangeImage} />
                                    <span className="img_event__span">Если не добавить изображение, фон будет выбран по умолчанию</span>
                                </div>
                                <img className='img_event__box' onClick={imgClick} src={file.preview} />
                            </div>

                        </div>

                        <div className="admin_event__form-control-submit">
                            <button className="admin_event__submit btn" onClick={submitFunc1} type="submit">
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </>);
}

export default EventPageAdd;