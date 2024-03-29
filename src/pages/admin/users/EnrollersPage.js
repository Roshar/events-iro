import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import Header from "../../../components/header/Header";
import checkAdminRole from "../../../utils/sendHeaders";
import add from "./../../../img/icons/plus-round-line-icon.svg";
import AdminMenu from "../../../components/adminMenu/AdminMenu";
import Notification from "../../../components/notification/Notification";
import API from "../../../API/api";

const EnrollersPage = () => {
  const navigate = useNavigate();

  const [notificationMsg, setNotificationMsg] = useState("");
  const [vissibleNotif, setVissibleNotif] = useState("none");
  const [vissibleNotifText, setVissibleNotifText] = useState("");
  const [vissibleStatus, setVissibleStatus] = useState("");
  const [IDNotification, setIDNotification] = useState("");

  const [userList, setUserList] = useState([]);
  let counter = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [lastIndex1, setLastIndex1] = useState(1);
  const [firstIndex1, setFirstIndex1] = useState(0);
  const recordsPerPage = 5;

  const moreInfo = async (e) => {
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
      `/admin/enrollers/${JSON.stringify(params)}`,
      checkAdminRole()
    );
    if (data.code === 403) {
      navigate(`/login`);
    } else {
      let result = Array.from(new Set([...userList, ...data]));
      setUserList(result);
    }
  };

  const getEnrollersPage = async () => {
    const params = {
      firstIndex: firstIndex1,
      lastIndex: lastIndex1,
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/enrollers/${JSON.stringify(
        params
      )}`,
      checkAdminRole()
    );
    if (data.code === 403) {
      navigate("/login");
    } else {
      console.log(data);
      setUserList(data);
    }
  };

  useEffect(() => {
    getEnrollersPage();
    const notification = JSON.parse(localStorage.getItem("update"));

    if (notification) {
      setNotificationMsg(notification.msg);
      setVissibleNotif(notification.display);
      setVissibleNotifText(notification.displayText);
      setVissibleStatus(notification.status);
      setIDNotification("update");
    }
  }, []);
  return (
    <>
      <Header />
      <main className="main">
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
            <div className="new_event__icon"></div>
          </div>
          <article className="enrollers">
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
                  <th
                    className="enrollers__table-tr table-tr-second"
                    scope="col"
                  >
                    Телефон
                  </th>
                  <th className="enrollers__table-tr" scope="col">
                    {" "}
                    Мероприятие
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
                      <td className="enrollers__table-td">
                        <NavLink
                          className="enrollers__link"
                          to={`/admin/enroller/${elem["uniq_serial_for_link"]}`}
                        >
                          {elem.surname} {elem.firstname} {elem.patronymic}
                        </NavLink>
                      </td>
                      <td className="enrollers__table-td">{elem.position}</td>
                      <td className="enrollers__table-td">{elem.company}</td>
                      <td className="enrollers__table-td">{elem.phone}</td>
                      <td className="enrollers__table-td">{elem.title}</td>
                      <td className="enrollers__table-td">
                        {/* <NavLink
                                                className="enrollers__link"
                                                to={`/admin/enroller/edit/${elem.id}`}
                                            >
                                                Изменить
                                            </NavLink> */}
                        <NavLink
                          className="enrollers__link"
                          to={`/admin/enroller/${elem["uniq_serial_for_link"]}`}
                        >
                          Посмотреть
                        </NavLink>{" "}
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
                    <button className="btn btn--moreLoad" onClick={moreInfo}>
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

export default EnrollersPage;
