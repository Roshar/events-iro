import Header from "../../components/header/Header";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import homeIcon from './../../img/icons/admin/webpagehome_85808.svg'
import peopleIcon from './../../img/icons/admin/people_group_icon_188185.svg'
import changeIcon from './../../img/icons/admin/1486564391-compose_81525.svg'
import offIcon from './../../img/icons/admin/1486564389-lock-red_81516.svg'
import deleteIcon from './../../img/icons/admin/1486564399-close_81512.svg'





const Main = () => {

    const [events, setEvents] = useState([])
    let counter = 0;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/`).then((response) => {
            setEvents(response.data)
        });
    }, []);

    console.log(events)


    return (
        <>

            {/* <div className="enrollers__btn-box">
                <img className="enrollers__icon" src={changeIcon} alt="" />
                <img className="enrollers__icon" src={offIcon} alt="" />
                <img className="enrollers__icon" src={deleteIcon} alt="" />
            </div> */}

            <Header />
            <main className="main">
                <aside className="aside">
                    <ul className="aside__subnav subnav-list list-reset">
                        <li className="subnav-list__element"><NavLink className='subnav-list__link' to={`/admin`}> <img src={homeIcon} className="subnav-list__icon"></img> Мероприятия </NavLink> </li>
                        <li className="subnav-list__element"><NavLink className='subnav-list__link' to={`/admin/speakers`}> <img src={peopleIcon} className="subnav-list__icon"></img> Спикеры </NavLink> </li>
                        <li className="subnav-list__element"><NavLink className='subnav-list__link' to={`/admin/enrollers`}> <img src={peopleIcon} className="subnav-list__icon"></img>Пользователи</NavLink></li>
                    </ul>
                </aside>
                <div className="container">
                    <article className="enrollers">
                        <table className="enrollers__table">
                            <thead>
                                <tr>
                                    <th className="enrollers__table-tr" scope="col">№</th>
                                    <th className="enrollers__table-tr table-tr-first" scope="col">Наименование мероприятия</th>
                                    <th className="enrollers__table-tr table-tr-second" scope="col">Категория</th>
                                    <th className="enrollers__table-tr" scope="col"> Дата проведения</th>
                                    <th className="enrollers__table-tr" scope="col"> Дата публикации </th>
                                    <th className="enrollers__table-tr" scope="col"> Автор</th>
                                    <th className="enrollers__table-tr" scope="col">Просмотр</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    events.map((elem) => {

                                        return (
                                            <tr>
                                                <th scope="row" key={elem.id}>{++counter}</th>
                                                <td className="enrollers__table-td"><NavLink className='enrollers__link' to={`/admin/event/edit/${elem.id_uniq}`}>{elem.title}</NavLink></td>
                                                <td className="enrollers__table-td">{elem.cat_name}</td>
                                                <td className="enrollers__table-td">{elem.date_event}</td>
                                                <td className="enrollers__table-td">{elem.dc}</td>
                                                <td className="enrollers__table-td">{elem.author}</td>
                                                <td className="enrollers__table-td"><NavLink className='enrollers__link' to={`/event/${elem.id_uniq}`}>Псмотреть</NavLink>  </td>
                                            </tr>)
                                    })}

                            </tbody>
                        </table>
                    </article>
                </div>
            </main>
        </>);
}

export default Main;