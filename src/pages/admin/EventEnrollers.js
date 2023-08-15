

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";
import checkAdminRole from '../../utils/sendHeaders'
import add from './../../img/icons/plus-round-line-icon.svg'
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Notification from "../../components/notification/Notification";
import * as XLSX from 'xlsx'
import API from "../../API/api";

const EventEnrollers = () => {

    const params = useParams()
    const id = params.id

    const navigate = useNavigate()

    const [notificationMsg, setNotificationMsg] = useState('')
    const [vissibleNotif, setVissibleNotif] = useState('none')
    const [vissibleNotifText, setVissibleNotifText] = useState('')
    const [vissibleStatus, setVissibleStatus] = useState('')
    const [IDNotification, setIDNotification] = useState('')
    const [userList, setUserList] = useState([])
    const [userListExcel, setUserListExcel] = useState([])
    const [eventTitle, setEventTitle] = useState([])


    const handleOnExport = async () => {
        const { data } = await API.get(`/admin/event/show_enrollers_for_excel/${id}/`, checkAdminRole());
        if (data.code === 403) {
            navigate('/login')
        } else {
            console.log(data)
            setUserListExcel(data)
        }

        let wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(userListExcel)
        XLSX.utils.book_append_sheet(wb, ws, "document");
        XLSX.writeFile(wb, `enrollers.xlsx`)
    }





    let counter = 0;

    const getEnrollersPage = async () => {
        const { data } = await API.get(`/admin/event/show_enrollers/${id}`, checkAdminRole());
        if (data.code === 403) {
            navigate('/login')
        } else {
            console.log(data)
            setUserList(data['enrollers'])
            setEventTitle(data['title'])
        }
    }

    const deleteEnrolles = async (e) => {
        // /admin/enroller/delete/${elem['uniq_serial_for_link']}
        e.preventDefault();
        document.getElementById(e.target.id).disabled = true

        const { data } = await API.get(`/admin/enroller/delete/${e.target.id}`, checkAdminRole());
        if (data.code === 403) {
            navigate('/login')
        } else {

            console.log(data)

            data.display = 'vissible'
            data.displayText = 'X'
            localStorage.setItem('update', JSON.stringify(data))

            navigate(`/admin/event/show_enrollers/${id}`)

            const notification = JSON.parse(localStorage.getItem('update'))

            if (notification) {
                setNotificationMsg(notification.msg)
                setVissibleNotif(notification.display)
                setVissibleNotifText(notification.displayText)
                setVissibleStatus(notification.status)
                setIDNotification('update')
            }

            getEnrollersPage()



        }
    }

    useEffect(() => {
        getEnrollersPage()
        const notification = JSON.parse(localStorage.getItem('update'))

        if (notification) {
            setNotificationMsg(notification.msg)
            setVissibleNotif(notification.display)
            setVissibleNotifText(notification.displayText)
            setVissibleStatus(notification.status)
            setIDNotification('update')
        }
    }, [])
    return (<>
        <Header />
        <main className="main">
            <div className="container">
                <Notification msg={notificationMsg} display={vissibleNotif} displayText={vissibleNotifText} status={vissibleStatus} id={IDNotification} />
                <AdminMenu />

                <div className="new_event">
                    <div className="new_event__icon">
                    </div>
                </div>

                <article className="enrollers">

                    <h2 className="enrollers__title"> {eventTitle}</h2>

                    {userList.length > 0 ?

                        <div className="enrollers__container">
                            <div className="enrollers__btn_box">
                                <button className="btn btn--download" onClick={handleOnExport} >Скачать список зарегистрировавшихся</button>
                            </div>



                            <table className="enrollers__table enrollers__table--users">
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

                                        <th
                                            className="enrollers__table-tr table-tr-first"
                                            scope="col"
                                        >
                                            Район
                                        </th>


                                        <th
                                            className="enrollers__table-tr table-tr-second"
                                            scope="col"
                                        >
                                            Место работы
                                        </th>

                                        <th className="enrollers__table-tr" scope="col">
                                            {" "}
                                            Должность
                                        </th>

                                        <th className="enrollers__table-tr" scope="col">
                                            {" "}
                                            Стаж работы
                                        </th>

                                        <th className="enrollers__table-tr" scope="col">
                                            {" "}
                                            Адрес эл. почты
                                        </th>
                                        <th
                                            className="enrollers__table-tr table-tr-second"
                                            scope="col"
                                        >
                                            Телефон
                                        </th>

                                        <th className="enrollers__table-tr" scope="col">
                                            Операции
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((elem) => {
                                        return (
                                            <tr key={elem.id}>
                                                <td scope="row">{++counter}</td>
                                                <td className="enrollers__table-td" >
                                                    <NavLink
                                                        className="enrollers__link"
                                                        to={`/admin/enroller/${elem['uniq_serial_for_link']}`}
                                                    >
                                                        {elem.surname} {elem.firstname} {elem.patronymic}
                                                    </NavLink>
                                                </td>
                                                <td className="enrollers__table-td">{elem.title_area}</td>
                                                <td className="enrollers__table-td">{elem.company}</td>
                                                <td className="enrollers__table-td">{elem.position}</td>
                                                <td className="enrollers__table-td">{elem.experience}</td>
                                                <td className="enrollers__table-td">{elem.email}</td>
                                                <td className="enrollers__table-td">{elem.phone}</td>

                                                <td className="enrollers__table-td">
                                                    <button className='btn--admin-del  ' id={elem['uniq_serial_for_link']} onClick={deleteEnrolles} type="button" > Удалить </button>
                                                </td>
                                            </tr>
                                        );
                                    })

                                    }

                                </tbody>
                            </table>
                        </div>

                        : <h2 style={{ "textAlign": "center" }}> Нет пользователей</h2>
                    }

                </article>
            </div>
        </main>
    </>);
}

export default EventEnrollers;