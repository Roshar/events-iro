

import axios from 'axios';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../notification/Notification';
import checkAdminRole from './../../utils/sendHeaders'
import getCookies from "../../utils/getCookies";
import setCookies from "../../utils/setCookies";


const Login = () => {
    const navigate = useNavigate()
    const [notificationMsg, setNotificationMsg] = useState('')
    const [vissibleNotif, setVissibleNotif] = useState('none')
    const [vissibleNotifText, setVissibleNotifText] = useState('')
    const [vissibleStatus, setVissibleStatus] = useState('')
    const [IDNotification, setIDNotification] = useState('')


    const [event, setEvent] = useState({
        login: "",
        password: "",
    })



    const [result, setResult] = useState({});
    const [messageNot, setMessageNot] = useState('');

    const handleChange = (e) => {
        setEvent(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const login_i = document.getElementById("login_i");
    const password_i = document.getElementById("password_i");


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
        const loginVal = login_i.value.trim();
        const passwordVal = password_i.value.trim();

        if (loginVal === '') {
            setError(login_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(login_i)
        }

        if (passwordVal === '') {
            setError(password_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(password_i)
        }


    }


    const onClick = async (e) => {
        e.preventDefault()
        validateInputs()
        const errorCount = checkError()

        if (errorCount.length < 1) {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, event);
                if (data.token) {
                    navigate('/admin')
                    data.display = 'vissible'
                    data.displayText = 'X'

                    setCookies('token_statipkro', data.token)
                    localStorage.setItem('update', JSON.stringify(data))
                } else {
                    setNotificationMsg(data.msg)
                }

            } catch (err) {
                console.log(err.message)
            }
        }


    }

    const getLoginPage = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/login`, checkAdminRole())
        console.log(data)
        if (data.code === 301) navigate('/admin')
    }

    useEffect(() => {
        getLoginPage()
    }, [])



    return (
        <div className="registration">

            <div className="container">

                <div className="registration_content__title">
                    <h1 className="title-2">
                        Войти
                    </h1>
                </div>


                <div className="registration__form register">

                    <div className="register__block">
                        <label className="register__label" htmlFor="login_i" id="login_l" >
                            <span className="register__required">*</span> Логин: </label>
                        <input className="register__input" id="login_i" type="text" name="login" aria-labelledby="surname_i"
                            aria-describedby="danger-login" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-login"></span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="name_i" id="name_l" >
                            <span className="register__required">*</span> Пароль: </label>
                        <input className="register__input" id="password_i" type="password" name="password" aria-labelledby="name_i"
                            aria-describedby="danger-name" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-login"></span>
                    </div>


                    <button className="register__btn btn" type='submit' onClick={onClick}>Войти</button>

                    <div className="message">

                        <p className="message__text">{notificationMsg}</p>


                    </div>
                </div>




            </div>
        </div>
    );
}

export default Login;