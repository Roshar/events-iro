

import axios from 'axios';
import './styles.css';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = ({ id, title }) => {
    const navigate = useNavigate()

    const [event, setEvent] = useState({
        event_id: id,
        surname: "",
        firstname: "",
        patronymic: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        area_id: ""
    })

    const [result, setResult] = useState({});



    const handleChange = (e) => {
        setEvent(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const checkForm = () => {
        const name_i = document.getElementById("name_i").value;
        const surname_i = document.getElementById("name_i").value;
        const patronymic_i = document.getElementById("name_i").value;


    }

    const onClick = async (e) => {
        checkForm()
        e.preventDefault()

        try {
            const resObj = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, event)
            resObj.event_id = id;
            setEvent(resObj);
            navigate(`/registered/${resObj.data.user_id_link}`)
            localStorage.setItem(resObj.data.user_id_link, JSON.stringify(resObj))
        } catch (err) {
            console.log(err.message)
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
                        <span className="txt-danger" id="danger-surname">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="name_i" id="name_l" >
                            <span className="register__required">*</span> Имя: </label>
                        <input className="register__input" id="name_i" type="text" name="firstname" aria-labelledby="name_i"
                            aria-describedby="danger-name" aria-required="true" required onChange={handleChange} />
                        <span className="txt-danger" id="danger-name">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="patronymic_i" id="patronymic_l" >
                            Отчество: </label>
                        <input className="register__input" id="patronymic_i" type="text" name="patronymic" aria-labelledby="patronymic_i"
                            aria-describedby="danger-patronymic" onChange={handleChange} />
                        <span className="txt-danger" id="danger-patronymic">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="email_i" id="email_l" >
                            <span className="register__required">*</span> Email: </label>
                        <input className="register__input" id="email_i" type="email" name="email" aria-labelledby="email_i"
                            aria-describedby="danger-email" aria-required="true" required onChange={handleChange} />
                        <span className="txt-danger" id="danger-email">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="phone_i" id="phone_l" >
                            <span className="register__required">*</span>  Телефон: </label>
                        <input className="register__input" id="email_i" type="phone" name="phone" aria-labelledby="phone_i"
                            aria-describedby="danger-phone" aria-required="true" required onChange={handleChange} />
                        <span className="txt-danger" id="danger-phone">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="company_i" id="company_l" >
                            <span className="register__required">*</span>  Организация: </label>
                        <input className="register__input" id="email_i" type="text" name="company" aria-labelledby="company_i"
                            aria-describedby="danger-company" aria-required="true" required onChange={handleChange} />
                        <span className="txt-danger" id="danger-company">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="position_i" id="position_l" >
                            <span className="register__required">*</span>  Должность: </label>
                        <input className="register__input" id="position_i" type="text" name="position" aria-labelledby="position_i"
                            aria-describedby="danger-position" aria-required="true" required onChange={handleChange} />
                        <span className="txt-danger" id="danger-position">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="position_i" id="position_l" >
                            <span className="register__required">*</span> Город/район: </label>
                        <select className="register__select" name="area_id" id="area_select" onChange={handleChange}>
                            <option value="" className="register__option">Выбрать</option>
                            <option value="1" className="register__option">город Аргун</option>
                        </select>
                        <span className="txt-danger" id="danger-position">Заполните поле </span>
                    </div>

                    <button className="register__btn btn" type='submit' onClick={onClick}>Зарегистрироваться</button>
                </div>


                {/* <div className="message">
                    <h3 className="message__title">Спасибо!</h3>
                    <p className="message__text">Вы успешно зарегистрированы на мероприятие</p>
                </div> */}
            </div>
        </div>
    );
}

export default Registration;