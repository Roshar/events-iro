import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import checkAdminRole from './../../utils/sendHeaders'
import add from './../../img/icons/plus-round-line-icon.svg'
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Notification from "../../components/notification/Notification";
import Edit from './../../img/icons/7879684661673670599.svg'
import './styles.css'
import getCookies from "../../utils/getCookies";
import setCookies from "../../utils/setCookies";

const Enroller = ({ id }) => {

    const navigate = useNavigate()
    const [enroller, setEnroller] = useState([])
    const [area, setArea] = useState([])
    const [phone, setPhone] = useState([])
    const [email, setEmail] = useState([])
    const [firstname, setFirstname] = useState([])
    const [surname, setSurname] = useState([])
    const [patronymic, setPatronymic] = useState([])
    const [experience, setExperience] = useState([])
    const [position, setPosition] = useState([])
    const [company, setCompany] = useState([])

    const [event, setEvent] = useState([])


    const getSpeaker = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/enroller/${id}`, checkAdminRole())
        console.log(data)
        if (data.code === 403) {
            navigate('/login')
        } else if (data.code === 204) {
            console.log('204')
            navigate('/admin/speakers')
        }

        else {
            setFirstname(data[0]['firstname'])
            setSurname(data[0]['surname'])
            setPatronymic(data[0]['patronymic'])
            setPosition(data[0]['position'])
            setCompany(data[0]['company'])

            setExperience(data[0]['experience'])
            setArea(data[0]['title_area'])
            setPhone(data[0]['phone'])
            setEmail(data[0]['email'])
            setEvent(data[0]['title'])
        }
    }

    const submitFuncDel = async (e) => {
        e.preventDefault();
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/enroller/delete/${id}`, checkAdminRole())

        if (data.code === 403) {
            navigate('/login')
        } else {
            navigate(`/admin/enrollers`)

            data.display = 'vissible'
            data.displayText = 'X'
            localStorage.setItem('update', JSON.stringify(data))
        }

    }

    useEffect(() => {
        getSpeaker()
    }, [])


    return (
        <div className="personal_card">
            <div className="personal_card__img-box">
                <img src={`${process.env.REACT_APP_BASE_IMG_URL}/avatars/avatar_enroller.jpg`} alt="" className="personal_card__img" />

            </div>

            <div className="personal_card__main_info">
                <h4 className="perosnal_card__main_fio heading-reset">
                    {surname} {firstname} {patronymic}
                </h4>
                <h4 className="personal_card__main_position heading-reset">
                    должность: {position}
                </h4>


                <h4 className="personal_card__main_company heading-reset">
                    <span className="personal_card__main_company--small"> Место работы: </span>{company}
                </h4>

                <h4 className="personal_card__main_position heading-reset">
                    стаж: {experience}
                </h4>

                <h4 className="personal_card__main_position heading-reset">
                    город/район: {area}
                </h4>

                <h4 className="personal_card__main_position heading-reset">
                    телефон: {phone}
                </h4>
                <h4 className="personal_card__main_position heading-reset">
                    email: {email}
                </h4>

                <h4 className="personal_card__main_position heading-reset">
                    мероприятие: <strong>{event}</strong>
                </h4>

                <div className="personal_card__block_submit">
                    <button className="personal_card__btn btn btn--del" onClick={submitFuncDel} type="submit">
                        Удалить
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Enroller; 