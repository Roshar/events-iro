import Header from "../../components/header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Notification from "../../components/notification/Notification";
import add from "./../../img/icons/plus-round-line-icon.svg";
import checkAdminRole from "./../../utils/sendHeaders";
import API from "../../API/api";

const Main = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [vissibleNotif, setVissibleNotif] = useState("none");
  const [vissibleNotifText, setVissibleNotifText] = useState("");
  const [vissibleStatus, setVissibleStatus] = useState("");
  const [IDNotification, setIDNotification] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastIndex1, setLastIndex1] = useState(1);
  const [firstIndex1, setFirstIndex1] = useState(0);
  const recordsPerPage = 5;

  let counter = 0;

  const moreEvents = async (e) => {
    const curP = currentPage;
    const lastP = lastIndex1;
    const firP = firstIndex1;

    setCurrentPage(currentPage + 1);
    setLastIndex1(currentPage * recordsPerPage);
    setFirstIndex1(lastIndex1 - recordsPerPage);

    const lastIndex = (currentPage + 1) * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const params = {
      firstIndex,
      lastIndex,
    };
    const { data } = await API.get(
      `/admin/main/${JSON.stringify(params)}`,
      checkAdminRole()
    );
    if (data.code === 403) {
      navigate(`/login`);
    } else {
      let result = Array.from(new Set([...events, ...data]));
      setEvents(result);
    }
  };

  const handleSearch = async (e) => {
    let q = JSON.stringify(e.target.value);
    const response = await API.post(`/admin/event/search`, checkAdminRole(q));
    if (response.data.code === 403) {
      navigate("/login");
    } else {
      if (e.target.value.length > 0) {
        setEvents(response.data);
      } else {
        setEvents([]);
        getAdminPage();
      }
    }
  };

  const getAdminPage = async () => {
    const params = {
      firstIndex: firstIndex1,
      lastIndex: lastIndex1,
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/main/${JSON.stringify(
          params
        )}`,
        checkAdminRole()
      );
      if (data.code === 403) {
        navigate(`/login`);
      } else {
        setEvents(data);
      }
    } catch (e) {
      console.log(`dfdfdfd ${e.message}`);
    }
  };

  useEffect(() => {
    getAdminPage();

    const notification = JSON.parse(localStorage.getItem("update"));

    if (notification) {
      setNotificationMsg(notification.msg);
      setVissibleNotif(notification.display);
      setVissibleNotifText(notification.displayText);
      setVissibleStatus(notification.status);
      setIDNotification("update");
    }
  }, []);

  const setStatus = (status) => {
    return status === 1 ? "да" : "нет";
  };

  return (
    <>
      <Header />

      <main className="main main--admin">
        <div className="container">
          <Notification
            msg={notificationMsg}
            display={vissibleNotif}
            displayText={vissibleNotifText}
            status={vissibleStatus}
            id={IDNotification}
          />

          <AdminMenu />
          <div className="new_event">
            <div className="new_event__icon">
              <NavLink className="new_event__link" to={`/admin/event/add`}>
                {" "}
                <img src={add} alt="" />
              </NavLink>
            </div>
            <NavLink className="new_event__link" to={`/admin/event/add`}>
              {" "}
              Добавить новое событие{" "}
            </NavLink>
            <input
              type="text"
              className="admin_event__input"
              onChange={handleSearch}
              placeholder="Введите название мероприятия"
            />
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
                    Список зарегистрировавшихся
                  </th>
                  <th className="enrollers__table-tr" scope="col">
                    Операции
                  </th>
                  <th className="enrollers__table-tr" scope="col">
                    Опубликовано
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((elem) => {
                  return (
                    <tr key={elem.id_uniq}>
                      <th scope="row">{++counter}</th>
                      <td className="enrollers__table-td" key={elem.id_uniq}>
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
                      <td className="enrollers__table-td">
                        <NavLink
                          className="enrollers__link"
                          style={{ display: "block" }}
                          to={`/admin/event/show_enrollers/${elem.id_uniq}`}
                        >
                          Открыть
                        </NavLink>
                      </td>
                      <td className="enrollers__table-td">
                        <NavLink
                          className="enrollers__link"
                          to={`/admin/event/edit/${elem.id_uniq}`}
                        >
                          Изменить
                        </NavLink>
                        <NavLink
                          className="enrollers__link"
                          to={`/event/${elem.id_uniq}`}
                        >
                          Посмотреть
                        </NavLink>{" "}
                      </td>
                      <td className="enrollers__table-td">
                        {setStatus(elem.published)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  {/* <td colspan="8"> Страница: 1, 2, 3</td> */}
                  <td className="enrollers__table-tr_moreLoad" colSpan="8">
                    {" "}
                    <button className="btn btn--moreLoad" onClick={moreEvents}>
                      Загрузить еще...{" "}
                    </button>{" "}
                  </td>
                </tr>
              </tfoot>
            </table>
          </article>
        </div>
      </main>
    </>
  );
};

export default Main;
