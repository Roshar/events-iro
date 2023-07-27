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

const Speaker = ({ id }) => {



    const navigate = useNavigate()
    const [speaker, setSpeaker] = useState([])
    const [firstname, setFirstname] = useState([])
    const [surname, setSurname] = useState([])
    const [patronymic, setPatronymic] = useState([])
    const [position, setPosition] = useState([])
    const [company, setCompany] = useState([])
    const [avatar, setAvatar] = useState([])



    console.log(getCookies());

    const getSpeaker = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/speaker/${id}`, checkAdminRole())
        if (data.code === 403) {
            navigate('/login')
        } else {
            setFirstname(data[0]['firstname'])
            setSurname(data[0]['surname'])
            setPatronymic(data[0]['patronymic'])
            setPosition(data[0]['position'])
            setCompany(data[0]['company'])
            setAvatar(data[0]['avatar'])
        }
    }

    useEffect(() => {
        getSpeaker()
    }, [])




    return (
        <div className="personal_card">
            <div className="personal_card__img-box">
                <img src={`${process.env.REACT_APP_BASE_IMG_URL}/avatars/${avatar}`} alt="" className="personal_card__img" />
                <NavLink to={`/admin/speaker/edit/${id}`}><img src={Edit} className="personal_card__icon_edit" alt="" /></NavLink>
            </div>

            <div className="personal_card__main_info">
                <h4 className="perosnal_card__main_fio heading-reset">
                    {surname} {firstname} {patronymic}
                </h4>
                <h4 className="personal_card__main_position heading-reset">
                    {position}
                </h4>

                <h4 className="personal_card__main_company heading-reset">
                    <span className="personal_card__main_company--small"> Место работы: </span>{company}
                </h4>

            </div>
        </div>
    );
}

export default Speaker; 