import React, { useState, useEffect } from "react";
import AdminMenu from "../../../components/adminMenu/AdminMenu";
import Notification from "../../../components/notification/Notification";
import Header from "./../../../components/header/Header";
import Report from "../../../components/report/Report";
import checkAdminRole from '../../../utils/sendHeaders'


import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import './report.css'
import ReportTable from "../../../components/reportTable/ReportTable";





const ReportPage = () => {

    const navigate = useNavigate()
    const [notificationMsg, setNotificationMsg] = useState('')
    const [vissibleNotif, setVissibleNotif] = useState('none')
    const [vissibleNotifText, setVissibleNotifText] = useState('')
    const [vissibleStatus, setVissibleStatus] = useState('')
    const [IDNotification, setIDNotification] = useState('')

    const [countEvent, setCountEvent] = useState([])
    const [countEnrollers, setCountEnrollers] = useState([])
    const [countSpeakers, setCountSpeakers] = useState([])

    const [categories, setCategories] = useState([])
    const [organizations, setOrganizations] = useState([])
    const [centers, setCenters] = useState([])

    const getReportPage = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/report`, checkAdminRole())

        console.log(data);
        if (data.code === 403) {
            navigate('/login')
        }

        else {
            setCountEvent(data['events'][0]['count'] ? data['events'][0]['count'] : 0)
            setCountEnrollers(data['enrollers'][0]['count'])
            setCountSpeakers(data['speakers'][0]['count'])
            setCategories(data['categories'])
            setOrganizations(data['organizations'])
            setCenters(data['centers'])

        }
    }

    useEffect(() => {
        getReportPage()

    }, [])

    return (<>
        <Header />
        <main className="main">
            <div className="container">
                <Notification msg={notificationMsg} display={vissibleNotif} displayText={vissibleNotifText} status={vissibleStatus} id={IDNotification} />
                <AdminMenu />
                <div className="report report_box">
                    <h1 className="report__heading">
                        Статистика
                    </h1>
                    <div className="report__header">
                        <ul className="report__card card_list list-reset">
                            <li className="card_list__item">
                                <h3 className="card_list__title">
                                    Количество мероприятий
                                </h3>
                                <h4 className="card__value">
                                    {countEvent}
                                </h4>
                            </li>
                            <li className="card_list__item">
                                <h3 className="card_list__title">
                                    Количество зарегистрированных
                                </h3>
                                <h4 className="card__value">
                                    {countEnrollers}
                                </h4>
                            </li>
                            <li className="card_list__item">
                                <h3 className="card_list__title">
                                    Количество спикеров
                                </h3>
                                <h4 className="card__value">
                                    {countSpeakers}
                                </h4>
                            </li>
                        </ul>
                    </div>

                    <Report
                        setNotificationMsg={setNotificationMsg}
                        setVissibleNotif={setVissibleNotif}
                        setVissibleNotifText={setVissibleNotifText}
                        setVissibleStatus={setVissibleStatus}
                        setIDNotification={setIDNotification}
                        title="Отчет №1 «Мероприятия»"
                        categories={categories}
                        organizations={organizations}
                        centers={centers}
                        type="events"
                        statText="мероприятиям"
                        excelDocText="Мероприятия"
                    />

                    <Report
                        setNotificationMsg={setNotificationMsg}
                        setVissibleNotif={setVissibleNotif}
                        setVissibleNotifText={setVissibleNotifText}
                        setVissibleStatus={setVissibleStatus}
                        setIDNotification={setIDNotification}
                        title="Отчет №2 «Участники»"
                        categories={categories}
                        organizations={organizations}
                        centers={centers}
                        type="enrollers"
                        statText="участникам"
                        excelDocText="Участники"
                    />

                    <ReportTable
                        setNotificationMsg={setNotificationMsg}
                        setVissibleNotif={setVissibleNotif}
                        setVissibleNotifText={setVissibleNotifText}
                        setVissibleStatus={setVissibleStatus}
                        setIDNotification={setIDNotification}

                        categories={categories}
                        organizations={organizations}
                        centers={centers}


                    />


                </div>
            </div>
        </main>
    </>);
}

export default ReportPage;