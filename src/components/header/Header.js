
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from "react";

import axios from "axios";
import checkAdminRole from './../../utils/sendHeaders'
import cookies from './../../utils/setCookies'
import logo from './img/logo.png';
import './style.css';


const Header = () => {

    const [role, setRole] = useState("")
    const [link, setLink] = useState("")

    const navigate = useNavigate()

    const getRole = async () => {
        const response = await
            axios.get(`${process.env.REACT_APP_BASE_URL}/checkRole`, checkAdminRole())
        if (response.data.code === 403) {
            setRole("Войти")
            setLink("/login")
        } else if (response.data.code === 200) {
            setRole("Выйти")
            setLink("/logout")
        }
    }


    const handleLink = (e) => {
        if (e.target.id === "/logout") {

            document.cookie = "token_statipkro=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            navigate("/login")

        }
    }

    useEffect(() => {

        getRole()

    }, [])



    return (
        <header className="header">
            <div className="container">
                <nav className="header__top-nav top-nav" aria-label="Основные разделы на странице">
                    <a href="/" className="logo header__logo">
                        <img className="logo__img" src={logo} alt="Logo" />
                        <p className="logo__desc-box">
                            <span className='logo__desc-title-1'>Государственное бюджетное учреждение дополнительного профессионального образования</span><br />
                            <span className='logo__desc-title-2'>«ИНСТИТУТ РАЗВИТИЯ ОБРАЗОВАНИЯ
                                ЧЕЧЕНСКОЙ РЕСПУБЛИКИ»</span>
                        </p>

                    </a>
                    <ul className="header__menu-top menu-top list-reset">
                        <li className="menu-top__item">
                            <NavLink to='/#' className="menu-list__link" >
                                Помощь
                            </NavLink>


                        </li>
                        <li className="menu-top__item">
                            <NavLink onClick={handleLink} id={link} to={link} className="menu-list__link" >
                                {role}
                            </NavLink>

                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;