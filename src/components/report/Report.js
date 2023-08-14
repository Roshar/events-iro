import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";


import checkAdminRole from '../../utils/sendHeaders'
import getCookie from './../../utils/getCookies'

import * as XLSX from 'xlsx'

const Report = (
    { setIDNotification,
        setVissibleStatus,
        setVissibleNotifText,
        setVissibleNotif,
        setNotificationMsg,
        title,
        centers,
        organizations,
        categories,
        type,
        statText,
        excelDocText
    }) => {





    const handleOnExport = () => {
        let wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(reportStatData)
        XLSX.utils.book_append_sheet(wb, ws, "document");
        XLSX.writeFile(wb, `${excelDocText}.xlsx`)
    }


    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентабрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const navigate = useNavigate()



    const [result, setResult] = useState(false)
    const [resYear, setResYear] = useState("")

    const [resMonth, setResMonth] = useState("не указано")
    const [resOrg, setResOrg] = useState("не указано")
    const [resCat, setResCat] = useState("не указано")
    const [resCen, setResCen] = useState("не указано")
    const [resAmount, setResAmount] = useState("не указано")
    const [resActual, setResActual] = useState("не указано")



    const [active, setActive] = useState(false)
    const [disabledStatus, setDisabledStatus] = useState(true)
    const [disabledCenters, setDisabledCenters] = useState(true)
    const [disabledStatusExcel, setDisabledStatusExcel] = useState(true)
    const [btnClass, setBtnClass] = useState('personal_card__btn btn btn--no-active')
    const [btnClassExcel, setBtnClassExcel] = useState('btn btn--excel--no-active')



    const [year, setYear] = useState('2023')
    const [month, setMonth] = useState("all")
    const [organizationId, setOrganizationId] = useState("all")
    const [centerId, setCenterId] = useState("all")
    const [categoryId, setCategoryId] = useState("all")
    const [actual, setActual] = useState(2)

    const getOrg = (arr, idx) => {
        const res = arr.filter((e) => {
            return e['id'] == idx
        })
        return (res.length > 0) ? res[0]['name'] : "не указано"
    }

    const getCat = (arr, idx) => {
        const res = arr.filter((e) => {
            return e['id'] == idx
        })
        return (res.length > 0) ? res[0]['cat_name'] : "не указано"
    }

    const getCenter = (arr, idx) => {
        const res = arr.filter((e) => {
            return e['id'] == idx
        })
        return (res.length > 0) ? res[0]['name'] : "не указано"
    }

    const getMonth = (month, idx) => {
        return (idx !== "не указано") ? monthNames[resMonth - 1] : idx
    }

    const getActual = (idx) => {
        return (parseInt(idx) == 2) ? 'Прошедние' : 'Планируются'
    }


    const reportStatData = [
        {

            Год: year,
            Месяц: resMonth,
            Категория: getCat(categories, resCat),
            Организатор: getOrg(organizations, resOrg),
            "Статус мероприятия": getActual(resActual),
            "Структурное подразделение:": getCenter(centers, resCen),
            "Количество": ""


        }
    ]

    const actualList = [

        {
            id: 1,
            name: "Планируются"
        },
        {
            id: 2,
            name: "Прошедние"
        }
    ]


    const handleChangeYear = (e) => {
        if (e.target.value !== "") {
            setBtnClass('personal_card__btn btn ')
            setDisabledStatus(false)
        } else {
            setBtnClass('personal_card__btn btn btn--no-active')
            setDisabledStatus(true)
        }
        setYear(e.target.value)
    }

    const handleChangeOrg = (e) => {
        console.log(e.target.value)
        if (e.target.value == 2) {
            setDisabledCenters(false)
        } else {
            setDisabledCenters(true)
        }

        setOrganizationId(e.target.value)
    }

    const handleChangeMonth = (e) => {
        setMonth(e.target.value)
    }

    const handleChangeCategory = (e) => {
        setCategoryId(e.target.value)
    }

    const handleChangeCenter = (e) => {
        setCenterId(e.target.value)
    }

    const handleChangeActual = (e) => {
        setActual(e.target.value)
    }




    const submitEvents = async (e) => {
        e.preventDefault()
        const event = {
            year,
            month,
            categoryId,
            organizationId,
            centerId,
            actual
        }

        try {
            const formData = new FormData()

            formData.append('event', JSON.stringify(event))

            const cookies = getCookie()


            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/report/${type}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + cookies['token_statipkro'],
                }
            });

            // console.log(data)

            if (data.result.count > 0) {
                setDisabledStatusExcel(false)
                setBtnClassExcel('btn btn--excel')
                reportStatData[0]["Количество"] = data.result.count
                console.log(reportStatData)
            }


            if (data.code === 403) {
                navigate('/login')
            } else if (data.code === 200) {
                setResult(true)

                setResYear(data.result.year)
                setResMonth(data.result.month)
                setResOrg(data.result.organizationId)
                setResCat(data.result.categoryId)
                setResCen(data.result.centerId)
                setResAmount(data.result.count)
                setResActual(data.result.actual)

                const notification = JSON.parse(localStorage.getItem('update'))

                if (notification) {
                    setNotificationMsg(notification.msg)
                    setVissibleNotif(notification.display)
                    setVissibleNotifText(notification.displayText)
                    setVissibleStatus(notification.status)
                    setIDNotification('update')
                }


            }


            data.display = 'vissible'
            data.displayText = 'X'
            localStorage.setItem('update', JSON.stringify(data))


        } catch (err) {
            console.log(err.message)
        }

    }

    const submitEnrollers = () => {

    }
    return (

        <div className="report__block">
            <div className="report__fiters">
                {/* Группа Мероприятия */}
                <div className="report__filter_group">

                    <h2 className="report__heading">
                        {title}
                    </h2>
                    <span className="report__description">Каждый фильтр представляет собой критерий отбора данных</span>

                    <div className="report__container">

                        <div className="report__form report__form_events">
                            <label className="personal_card__label" htmlFor="year">
                                Год:
                            </label>
                            <select
                                className="report__select"
                                name="year"
                                id="year"
                                onChange={handleChangeYear}
                            >
                                <option
                                    className="report__option"
                                    value=""
                                >
                                    Выбрать год
                                </option>
                                <option
                                    className="report__option"
                                    value='2023'
                                >
                                    2023
                                </option>
                                <option
                                    className="report__option"
                                    value='2022'
                                >
                                    2022
                                </option>
                            </select>
                        </div>

                        <div className="report__form">
                            <label className="personal_card__label" htmlFor="month">
                                Месяц:
                            </label>
                            <select
                                className="report__select"
                                name="month"
                                id="month"
                                onChange={handleChangeMonth}
                            >
                                <option
                                    className="report__option"
                                    value="all"
                                >
                                    Все месяцы
                                </option>
                                <option
                                    className="report__option"
                                    value='1'
                                >
                                    Январь
                                </option>
                                <option
                                    className="report__option"
                                    value='2'
                                >
                                    Февраль
                                </option>

                                <option
                                    className="report__option"
                                    value='3'
                                >
                                    Март
                                </option>
                                <option
                                    className="report__option"
                                    value='4'
                                >
                                    Апрель
                                </option>

                                <option
                                    className="report__option"
                                    value='5'
                                >
                                    Май
                                </option>

                                <option
                                    className="report__option"
                                    value='6'
                                >
                                    Июнь
                                </option>

                                <option
                                    className="report__option"
                                    value='7'
                                >
                                    Июль
                                </option>

                                <option
                                    className="report__option"
                                    value='8'
                                >
                                    Август
                                </option>

                                <option
                                    className="report__option"
                                    value='9'
                                >
                                    Сентабрь
                                </option>

                                <option
                                    className="report__option"
                                    value='10'
                                >
                                    Октябрь
                                </option>

                                <option
                                    className="report__option"
                                    value='11'
                                >
                                    Ноябрь
                                </option>

                                <option
                                    className="report__option"
                                    value='12'
                                >
                                    Декабрь
                                </option>
                            </select>

                        </div>

                        <div className="report__form">
                            <label className="personal_card__label" htmlFor="category_id">
                                Категория:
                            </label>
                            <select
                                className="report__select"
                                name="category_id"
                                id="category_id"
                                onChange={handleChangeCategory}
                            >

                                <option
                                    className="report__option"
                                    value="all"
                                >
                                    Все
                                </option>
                                {categories.map((el) => {
                                    return (
                                        <option
                                            className="report__option"
                                            value={el.id}
                                            key={el.id}
                                        >
                                            {el.cat_name}
                                        </option>
                                    )
                                })}

                            </select>

                        </div>

                        <div className="report__form">
                            <label className="personal_card__label" htmlFor="organization_id">
                                Организатор:
                            </label>
                            <select
                                className="report__select"
                                name="organization_id"
                                id="organization_id"
                                onChange={handleChangeOrg}
                            >
                                <option
                                    className="report__option"
                                    value="all"
                                >
                                    Все
                                </option>
                                {organizations.map((el) => {
                                    return (
                                        <option
                                            className="report__option"
                                            value={el.id}
                                            key={el.id}
                                        >
                                            {el.name}
                                        </option>
                                    )
                                })}

                            </select>

                        </div>

                        <div className="report__form">
                            <label className="personal_card__label" htmlFor="center_id">
                                Структурное подразделение:
                            </label>
                            <select
                                disabled={disabledCenters}
                                className="report__select"
                                name="center_id"
                                id="center_id"
                                onChange={handleChangeCenter}
                            >

                                <option
                                    className="report__option"
                                    value="all"
                                >
                                    Все
                                </option>
                                {centers.map((el) => {
                                    return (
                                        <option
                                            className="report__option"
                                            value={el.id}
                                            key={el.id}
                                        >
                                            {el.name}
                                        </option>
                                    )
                                })}

                            </select>

                        </div>

                        <div className="report__form">
                            <label className="personal_card__label" htmlFor="center_id">
                                Статус м:
                            </label>
                            <select

                                className="report__select"
                                name="center_id"
                                id="center_id"
                                onChange={handleChangeActual}
                            >


                                {actualList.map((el) => {
                                    return (
                                        <option
                                            selected={el.id == 2}
                                            className="report__option"
                                            value={el.id}
                                            key={el.id}
                                        >
                                            {el.name}
                                        </option>
                                    )
                                })}

                            </select>

                        </div>

                    </div>

                    <div className="report__tbl-header">

                        {result !== false ?
                            <><h2>Статистика по {statText} за {year} год</h2>
                                <span className="report__description">Данные сформированы по выбранным критериям </span></>
                            :
                            <h2></h2>
                        }

                    </div>

                    {result !== false ?
                        <table className="report__tbl">
                            <tbody>
                                <tr className="report__tbl_tr">
                                    <th className="report__tbl_td">Год:</th>
                                    <td className="report__tbl_td">{resYear}</td>
                                </tr>
                                <tr className="report__tbl_tr">
                                    <th className="report__tbl_td">Месяц:</th>
                                    <td className="report__tbl_td">{getMonth(month, resMonth)}</td>
                                </tr>
                                <tr className="report__tbl_tr">
                                    <th className="report__tbl_td">Категория:</th>
                                    <td className="report__tbl_td">{getCat(categories, resCat)}</td>
                                </tr>
                                <tr className="report__tbl_tr">
                                    <th className="report__tbl_td">Организатор:</th>
                                    <td className="report__tbl_td">
                                        {
                                            getOrg(organizations, resOrg)
                                        }</td>
                                </tr>
                                <tr className="report__tbl_tr">
                                    <th className="report__tbl_td"> Статус мероприятия:</th>
                                    <td className="report__tbl_td">{getActual(resActual)}</td>
                                </tr>

                                <tr className="report__tbl_tr">
                                    <th className="report__tbl_td"> Структурное подразделение:</th>
                                    <td className="report__tbl_td">{getCenter(centers, resCen)}</td>
                                </tr>
                                <tr className="report__tbl_tr">
                                    <th className="report__tbl_td"> ИТОГО:</th>
                                    <td className="report__tbl_td"> {resAmount}</td>
                                </tr>
                            </tbody>

                        </table>
                        : ""

                    }

                    <div className="personal_card__block_submit">
                        <button className={btnClass} onClick={submitEvents} disabled={disabledStatus} type="submit">
                            Сгененрировать
                        </button>

                    </div>
                    <button onClick={handleOnExport} disabled={disabledStatusExcel} className={btnClassExcel}>

                        Экспорт в таблицу</button>



                </div>


            </div>
        </div>

    );
}

export default Report;