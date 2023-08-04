

import axios from 'axios';
import './styles.css';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = ({ id, title, areaList }) => {
    const navigate = useNavigate()

    const [event, setEvent] = useState({
        event_id: id,
        surname: "",
        firstname: "",
        patronymic: "",
        email: "",
        phone: "",
        company: "",
        experience: "",
        position: "",
        area_id: ""
    })



    const [result, setResult] = useState({});
    const [messageNot, setMessageNot] = useState('');

    const handleChange = (e) => {
        setEvent(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const name_i = document.getElementById("name_i");
    const surname_i = document.getElementById("surname_i");
    const email = document.getElementById("email_i");
    const phone_i = document.getElementById("phone_i");
    const company_i = document.getElementById("company_i");
    const experience_i = document.getElementById("experience_i");
    const position = document.getElementById("position");
    const area_id = document.getElementById("area_id");


    const checkError = () => {
        return document.querySelectorAll('.error');
    }

    const setError = (el, msg) => {
        const inputControl = el.parentElement;
        const errorDisplay = inputControl.querySelector('.notif');

        errorDisplay.innerText = msg;
        inputControl.classList.add('error');
        inputControl.classList.remove('success')

    }

    const setSuccess = el => {
        const inputControl = el.parentElement;
        const errorDisplay = inputControl.querySelector('.notif');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error')
    }

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInputs = () => {
        const nameVal = name_i.value.trim();
        const surnameVal = surname_i.value.trim();
        const emailVal = email.value.trim();
        const phoneVal = phone_i.value.trim();
        const companyVal = company_i.value.trim();
        const experienceVal = experience_i.value.trim();
        const positionVal = position.value.trim();
        const areaSelectVal = area_id.value;

        if (nameVal === '') {
            setError(name_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(name_i)
        }

        if (surnameVal === '') {
            setError(surname_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(surname_i)
        }

        if (emailVal === '') {
            setError(email, 'Поле необходимо заполнить');
        } else if (!isValidEmail(emailVal)) {
            setError(email, 'Невалидный почтовый адрес');
        } else {
            setSuccess(email);
        }

        if (phoneVal === '') {
            setError(phone_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(phone_i)
        }

        if (positionVal === '') {
            setError(position, 'Поле необходимо заполнить')
        } else {
            setSuccess(position)
        }

        if (companyVal === '') {
            setError(company_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(company_i)
        }

        if (experienceVal === '') {
            setError(company_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(company_i)
        }



        if (areaSelectVal === '') {
            setError(area_id, 'Необходимо выбрать город/район')
        } else {
            setSuccess(area_id)
        }


    }


    const onClick = async (e) => {
        e.preventDefault()
        validateInputs()
        const errorCount = checkError()

        if (errorCount.length < 1) {
            try {
                const resObj = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, event)
                resObj.event_id = id;
                if (resObj.data.errorIsRow === 1) {
                    console.log(resObj.data.msg)
                    setMessageNot(resObj.data.msg)
                } else {
                    setEvent(resObj);
                    navigate(`/registered/${resObj.data.user_id_link}`)
                    localStorage.setItem(resObj.data.user_id_link, JSON.stringify(resObj))
                }

            } catch (err) {
                console.log(err.message)
            }
        }


    }



    return (
        <div className="registration">
            < ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="container">
                <div className="registration_content__title">
                    <h1 className="title-2">
                        Регистрация
                    </h1>
                    <h1 className="title-3">
                        {title}
                    </h1>

                </div>

                <div className="registration__form register">

                    <div className="register__block">
                        <label className="register__label" htmlFor="surname_i" id="surname_l" >
                            <span className="register__required">*</span> Фамилия: </label>
                        <input className="register__input" id="surname_i" type="text" name="surname" aria-labelledby="surname_i"
                            aria-describedby="danger-surname" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-surname"></span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="name_i" id="name_l" >
                            <span className="register__required">*</span> Имя: </label>
                        <input className="register__input" id="name_i" type="text" name="firstname" aria-labelledby="name_i"
                            aria-describedby="danger-name" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-name"></span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="patronymic_i" id="patronymic_l" >
                            Отчество: </label>
                        <input className="register__input" id="patronymic_i" type="text" name="patronymic" aria-labelledby="patronymic_i"
                            aria-describedby="danger-patronymic" onChange={handleChange} />
                        <span className="notif" id="danger-patronymic"></span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="email_i" id="email_l" >
                            <span className="register__required">*</span> Email: </label>
                        <input className="register__input" id="email_i" type="email" name="email" aria-labelledby="email_i"
                            aria-describedby="danger-email" aria-required="true" required onChange={handleChange} />
                        <span className="notif " id="danger-email"> </span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="phone_i" id="phone_l" >
                            <span className="register__required">*</span>  Телефон: </label>
                        <input className="register__input" id="phone_i" type="phone" name="phone" aria-labelledby="phone_i"
                            aria-describedby="danger-phone" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-phone"></span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="company_i" id="company_l" >
                            <span className="register__required">*</span>  Организация: </label>
                        <input className="register__input" id="company_i" type="text" name="company" aria-labelledby="company_i"
                            aria-describedby="danger-company" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-company"></span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="experience_i" id="experience_l" >
                            <span className="register__required">*</span>  Стаж: </label>
                        <input className="register__input" id="experience_i" type="text" name="experience" aria-labelledby="experience_i"
                            aria-describedby="danger-company" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-experience"></span>
                    </div>



                    <div className="register__block">
                        <label className="register__label" htmlFor="position_i" id="position_l" >
                            <span className="register__required">*</span>  Должность: </label>
                        <input className="register__input" id="position" type="text" name="position" aria-labelledby="position_i"
                            aria-describedby="danger-position" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-position"> </span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="area_id" id="area_id_l" >
                            <span className="register__required">*</span> Город/район: </label>
                        <select className="register__select" name="area_id" id="area_id" onChange={handleChange}>
                            <option value="" className="register__option">Выбрать</option>
                            {areaList.map((el) => {
                                return (
                                    <option key={el.id_area} value={el.id_area} className="register__option">{el.title_area}</option>
                                )
                            })}


                        </select>
                        <span className="notif" id="danger-position"></span>
                    </div>

                    <button className="register__btn btn" type='submit' onClick={onClick}>Зарегистрироваться</button>

                    <div className="message">
                        {/* <h3 className="message__title">Спасибо!</h3> */}
                        <p className="message__text">{messageNot}</p>
                    </div>
                </div>




            </div>
        </div>
    );
}

export default Registration;