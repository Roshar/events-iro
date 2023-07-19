import Header from "../../components/header/Header";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Notification from "../../components/notification/Notification";


const Main = () => {
  const [events, setEvents] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState('')
  const [vissibleNotif, setVissibleNotif] = useState('none')
  const [vissibleNotifText, setVissibleNotifText] = useState('')
  const [vissibleStatus, setVissibleStatus] = useState('')
  const [IDNotification, setIDNotification] = useState('')

  let counter = 0;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/`).then((response) => {
      setEvents(response.data);
    });

    const notification = JSON.parse(localStorage.getItem('update'))

    console.log(notification)

    if (notification) {
      setNotificationMsg(notification.msg)
      setVissibleNotif(notification.display)
      setVissibleNotifText(notification.displayText)
      setVissibleStatus(notification.status)
      setIDNotification('update')
    }

  }, []);



  return (
    <>


      <Header />

      <main className="main main--admin">
        <AdminMenu />
        <div className="container">
          <article className="enrollers">

            <Notification msg={notificationMsg} display={vissibleNotif} displayText={vissibleNotifText} status={vissibleStatus} id={IDNotification} />

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
                    Наименование мероприятия
                  </th>
                  <th
                    className="enrollers__table-tr table-tr-second"
                    scope="col"
                  >
                    Категория
                  </th>
                  <th className="enrollers__table-tr" scope="col">
                    {" "}
                    Дата проведения
                  </th>
                  <th className="enrollers__table-tr" scope="col">
                    {" "}
                    Дата публикации{" "}
                  </th>
                  <th className="enrollers__table-tr" scope="col">
                    Автор
                  </th>
                  <th className="enrollers__table-tr" scope="col">
                    Просмотр
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((elem) => {
                  return (
                    <tr>
                      <th scope="row">{++counter}</th>
                      <td className="enrollers__table-td" key={elem.id}>
                        <NavLink
                          className="enrollers__link"
                          to={`/admin/event/edit/${elem.id_uniq}`}
                        >
                          {elem.title}
                        </NavLink>
                      </td>
                      <td className="enrollers__table-td">{elem.cat_name}</td>
                      <td className="enrollers__table-td">{elem.date_event}</td>
                      <td className="enrollers__table-td">{elem.dc}</td>
                      <td className="enrollers__table-td">{elem.author}</td>
                      <td className="enrollers__table-td">
                        <NavLink
                          className="enrollers__link"
                          to={`/event/${elem.id_uniq}`}
                        >
                          Псмотреть
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
};

export default Main;
