

import axios from 'axios';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
    const navigate = useNavigate()

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
        inputControl.classList.remove('success')

    }

    const setSuccess = el => {
        const inputControl = el.parentElement;
        const errorDisplay = inputControl.querySelector('.notif');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
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


            } catch (err) {
                console.log(err.message)
            }
        }


    }



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
                        <label className="register__label" htmlFor="surname_i" id="surname_l" >
                            <span className="register__required">*</span> Логин: </label>
                        <input className="register__input" id="surname_i" type="text" name="surname" aria-labelledby="surname_i"
                            aria-describedby="danger-surname" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-surname"></span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="name_i" id="name_l" >
                            <span className="register__required">*</span> Пароль: </label>
                        <input className="register__input" id="name_i" type="text" name="firstname" aria-labelledby="name_i"
                            aria-describedby="danger-name" aria-required="true" required onChange={handleChange} />
                        <span className="notif" id="danger-name"></span>
                    </div>


                    <button className="register__btn btn" type='submit' onClick={onClick}>Войти</button>

                    <div className="message">

                        <p className="message__text">{messageNot}</p>
                    </div>
                </div>




            </div>
        </div>
    );
}

export default LoginPage;