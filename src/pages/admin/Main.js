import Header from "../../components/header/Header";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/adminMenu/AdminMenu";







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

            <main className="main main--admin">
                <AdminMenu />
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