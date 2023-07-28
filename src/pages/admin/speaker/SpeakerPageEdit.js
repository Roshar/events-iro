import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Header from "./../../../components/header/Header";
import checkAdminRole from "../../../utils/sendHeaders"
import checkImgSize from "../../../utils/checkImgSize"
import ImgBlockError from "../../../components/imgBlockError/ImgBlockError";
import uploadIcon from './../../../img/icons/412975601606261173.svg'
import getCookie from './../../../utils/getCookies'
import AdminMenu from "../../../components/adminMenu/AdminMenu";


const SpeakerPageEdit = () => {

    const { id } = useParams();
    const [showBlock, setShowBlock] = useState('none')
    const navigate = useNavigate()
    const [speaker, setSpeaker] = useState([])
    const [firstname, setFirstname] = useState([])
    const [surname, setSurname] = useState([])
    const [patronymic, setPatronymic] = useState([])
    const [position, setPosition] = useState([])
    const [company, setCompany] = useState([])
    const [genderId, setGenderId] = useState('')
    const [genderList, setGenderList] = useState([]);
    const [avatar, setAvatar] = useState('')
    const [file, setFile] = useState('');

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

    const firstname_i = document.getElementById('firstname')
    const surname_i = document.getElementById('surname')
    const position_i = document.getElementById('position')
    const company_i = document.getElementById('company')

    const setSuccess = el => {
        const inputControl = el.parentElement;
        const errorDisplay = inputControl.querySelector('.notif');
        errorDisplay.innerText = '';
        inputControl.classList.add('success-i');
        inputControl.classList.remove('error')
    }

    const validateInputs = () => {

        const surname = firstname_i.value.trim();
        const firstnameVal = surname_i.value.trim();
        const positionVal = position_i.value.trim();
        const companyVal = company_i.value.trim();

        if (surname === '') {
            setError(firstname_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(firstname_i)
        }

        if (firstnameVal === '') {
            setError(surname_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(surname_i)
        }

        if (positionVal === '') {
            setError(position_i, 'Поле необходимо заполнить')
        } else {
            setSuccess(position_i)
        }

        if (companyVal === '') {
            setError(company_i, 'Поле необходимо заполнить');
        } else {
            setSuccess(company_i);
        }

    }

    const submitFunc = async (e) => {
        e.preventDefault()

        validateInputs()

        const errorCount = checkError()

        if (errorCount.length < 1) {

            const formData = new FormData()
            formData.append('id', id)
            formData.append('firstname', firstname)
            formData.append('surname', surname)
            formData.append('patronymic', patronymic)
            formData.append('position', position)
            formData.append('company', company)
            formData.append('gender_id', genderId)
            formData.append('avatar', avatar)

            formData.append('file', avatar)

            const cookies = getCookie()

            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/speaker/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + cookies['token_statipkro'],
                }
            });
            navigate(`/admin/speakers`)

            data.display = 'vissible'
            data.displayText = 'X'
            localStorage.setItem('update', JSON.stringify(data))

        } else {
            alert('Заполните все поля!')
        }

    }
    const submitFuncDel = async (e) => {
        e.preventDefault();
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/speaker/delete/${id}`, checkAdminRole())

        if (data.code === 403) {
            navigate('/login')
        } else {
            navigate(`/admin/speakers`)

            data.display = 'vissible'
            data.displayText = 'X'
            localStorage.setItem('update', JSON.stringify(data))
        }

    }
    const imgClick = () => {
        document.querySelector('#fileBtn').click();
    }

    const getSpeakerPageEdit = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/speaker/edit/${id}`, checkAdminRole())
        console.log(data)
        if (data.code === 403) {
            navigate('/login')
        } else if (data.notif.length > 0) {
            console.log('204')
            navigate('/admin/speakers')
        } else {
            setFirstname(data[0]['firstname'])
            setSurname(data[0]['surname'])
            setPatronymic(data[0]['patronymic'])
            setPosition(data[0]['position'])
            setCompany(data[0]['company'])
            setAvatar(data[0]['avatar'])
            setGenderId(data[0]['gender_id'])
            setGenderList(data[1])

            setFile(`${process.env.REACT_APP_BASE_IMG_URL}/avatars/${data[0]['avatar']}`)
        }
    }

    useEffect(() => {
        getSpeakerPageEdit()
    }, [])

    function handleChange(e) {

        if (e.target.files.length > 0) {
            if (checkImgSize(e.target.files[0].size)) {
                setFile(URL.createObjectURL(e.target.files[0]));
                setAvatar(e.target.files[0])
                setShowBlock('none')
            } else {
                setShowBlock('block')

            }
        }

        // setFile(URL.createObjectURL(e.target.files[0]));
        // setAvatar(e.target.files[0])

    }
    return (
        <>
            <Header />
            <main className="main">
                <div className="container--personal-card">
                    <AdminMenu />
                    <ImgBlockError status={showBlock} />
                    <div className="personal_card">

                        <div className="personal_card__img-box">

                            <input className="img_event__input--hidden" id="fileBtn" type="file" name="file" onChange={handleChange} />

                            <img src={file} alt="" className="personal_card__img" />
                            <img src={uploadIcon} className="personal_card__icon_edit" alt="" onClick={imgClick} />
                        </div>

                        <div className="personal_card__main_info">
                            <form action="" className="personal_card__form">

                                <div className="personal_card__block">
                                    <label className="personal_card__label" htmlFor="surname">
                                        Фамилия:
                                    </label>
                                    <input
                                        className="personal_card__input"
                                        type="text"
                                        id="surname"
                                        name="surname"
                                        onChange={e => setSurname(e.target.value)}
                                        value={surname}
                                    />
                                    <span className="notif" > </span>
                                </div>
                                <div className="personal_card__block">
                                    <label className="personal_card__label" htmlFor="firstname">
                                        Имя:
                                    </label>
                                    <input
                                        className="personal_card__input"
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        onChange={e => setFirstname(e.target.value)}
                                        value={firstname}
                                    />
                                    <span className="notif" > </span>
                                </div>

                                <div className="personal_card__block">
                                    <label className="personal_card__label" htmlFor="firstname">
                                        Отчество:
                                    </label>
                                    <input
                                        className="personal_card__input"
                                        type="text"
                                        id="patronymic"
                                        name="patronymic"
                                        onChange={e => setPatronymic(e.target.value)}
                                        value={patronymic}
                                    />
                                    <span className="notif"> </span>
                                </div>

                                <div className="personal_card__block">
                                    <label className="personal_card__label" htmlFor="position">
                                        Должность:
                                    </label>
                                    <input
                                        className="personal_card__input"
                                        type="text"
                                        id="position"
                                        name="position"
                                        onChange={e => setPosition(e.target.value)}
                                        value={position}
                                    />
                                    <span className="notif"> </span>
                                </div>

                                <div className="personal_card__block">
                                    <label className="personal_card__label" htmlFor="company">
                                        Место работы:
                                    </label>
                                    <input
                                        className="personal_card__input"
                                        type="text"
                                        id="company"
                                        name="company"
                                        onChange={e => setCompany(e.target.value)}
                                        value={company}
                                    />
                                    <span className="notif"> </span>
                                </div>

                                <div className="personal_card__block">
                                    <label className="personal_card__label" htmlFor="company">
                                        Место работы:
                                    </label>
                                    <select
                                        className="personal_card__select"
                                        name="category_id"
                                        id="category_id"
                                        onChange={e => setGenderId(e.target.value)}
                                    >
                                        {genderList.map((el) => {
                                            return (
                                                <option
                                                    className="admin_event__option"
                                                    key={el.id}
                                                    value={el.id}
                                                    selected={el.id == genderId}
                                                >

                                                    {el.title}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <span className="notif"> </span>
                                </div>

                                <div className="personal_card__block_submit">
                                    <button className="personal_card__btn btn" onClick={submitFunc} type="submit">
                                        Обновить
                                    </button>
                                </div>
                            </form>
                            <div className="personal_card__block_submit">
                                <button className="personal_card__btn btn btn--del" onClick={submitFuncDel} type="submit">
                                    Удалить
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}

export default SpeakerPageEdit;