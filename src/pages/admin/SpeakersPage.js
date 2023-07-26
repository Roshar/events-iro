import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";
import checkAdminRole from '../../utils/sendHeaders'
import add from './../../img/icons/plus-round-line-icon.svg'
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Notification from "../../components/notification/Notification";

const SpeakersPage = () => {

    const navigate = useNavigate()

    const [notificationMsg, setNotificationMsg] = useState('')
    const [vissibleNotif, setVissibleNotif] = useState('none')
    const [vissibleNotifText, setVissibleNotifText] = useState('')
    const [vissibleStatus, setVissibleStatus] = useState('')
    const [IDNotification, setIDNotification] = useState('')

    const [speakerList, setSpeakerList] = useState([]);
    let counter = 0;

    const getSpeakerPage = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/speakers`, checkAdminRole());
        console.log(data);
        if (data === 403) {
            navigate('/login')
        } else {
            setSpeakerList(data)
        }
    }
    useEffect(() => {
        getSpeakerPage()
    }, [])
    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <Notification msg={notificationMsg} display={vissibleNotif} displayText={vissibleNotifText} status={vissibleStatus} id={IDNotification} />
                    <AdminMenu />
                    <div className="new_event">
                        <div className="new_event__icon">
                            <NavLink
                                className="new_event__link"
                                to={`/admin/speaker/create`}
                            >  <img src={add} alt="" />
                            </NavLink>

                        </div>
                        <NavLink
                            className="new_event__link"
                            to={`/admin/speaker/create`}
                        > Добавить новое событие </NavLink>
                    </div>
                    <article className="enrollers">
                        <table className="enrollers__table">
                            <thead>
                                <tr>
                                    <th className="enrollers__table-tr" scope="col">
                                        №
                                    </th>
                                    <th
                                        className="enrollers__table-tr table-tr-first"
                                        scope="col"
                                    >
                                        ФИО
                                    </th>
                                    <th className="enrollers__table-tr" scope="col">
                                        {" "}
                                        Должность
                                    </th>
                                    <th
                                        className="enrollers__table-tr table-tr-second"
                                        scope="col"
                                    >
                                        Место работы
                                    </th>


                                    <th className="enrollers__table-tr" scope="col">
                                        Операции
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {speakerList.map((elem) => {
                                    return (
                                        <tr>
                                            <th scope="row">{++counter}</th>
                                            <td className="enrollers__table-td" key={elem.id}>
                                                <NavLink
                                                    className="enrollers__link"
                                                    to={`/admin/speaker/${elem.id}`}
                                                >
                                                    {elem.surname} {elem.firstname} {elem.patronymic}
                                                </NavLink>
                                            </td>
                                            <td className="enrollers__table-td">{elem.position}</td>
                                            <td className="enrollers__table-td">{elem.company}</td>
                                            <td className="enrollers__table-td">

                                                <NavLink
                                                    className="enrollers__link"
                                                    to={`/admin/speaker/edit/${elem.id}`}
                                                >
                                                    Изменить
                                                </NavLink>

                                                <NavLink
                                                    className="enrollers__link"
                                                    to={`/admin/speaker/${elem.id}`}
                                                >
                                                    Посмотреть
                                                </NavLink>{" "}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </article>
                </div>
            </main>
        </>
    );
}

export default SpeakersPage;