import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import ExcelIcon from "./../../img/icons/272697_excel_icon.svg";

import checkAdminRole from "../../utils/sendHeaders";
import getCookie from "./../../utils/getCookies";

import * as XLSX from "xlsx";

const ReportTable = ({
  setIDNotification,
  setVissibleStatus,
  setVissibleNotifText,
  setVissibleNotif,
  setNotificationMsg,
  centers,
  organizations,
  categories,
}) => {
  const handleOnExport = () => {
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(enrollers);
    XLSX.utils.book_append_sheet(wb, ws, "Список");
    XLSX.writeFile(wb, "Список участников.xlsx");
  };

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентабрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const navigate = useNavigate();

  const [result, setResult] = useState(false);
  const [resYear, setResYear] = useState("");

  const [resMonth, setResMonth] = useState("не указано");
  const [resOrg, setResOrg] = useState("не указано");
  const [resCat, setResCat] = useState("не указано");
  const [resCen, setResCen] = useState("не указано");
  const [resAmount, setResAmount] = useState("не указано");
  const [resActual, setResActual] = useState("не указано");
  const [enrollers, setEnrollers] = useState([]);

  const [active, setActive] = useState(false);
  const [disabledStatus, setDisabledStatus] = useState(true);
  const [disabledStatusExcel, setDisabledStatusExcel] = useState(true);
  const [disabledCenters, setDisabledCenters] = useState(true);
  const [btnClass, setBtnClass] = useState(
    "personal_card__btn btn btn--no-active"
  );
  const [btnClassExcel, setBtnClassExcel] = useState(
    "btn btn--excel--no-active"
  );

  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("all");
  const [organizationId, setOrganizationId] = useState("all");
  const [centerId, setCenterId] = useState("all");
  const [categoryId, setCategoryId] = useState("all");
  const [actual, setActual] = useState(2);

  const actualList = [
    {
      id: 1,
      name: "Планируют участие",
    },
    {
      id: 2,
      name: "Приняли участие",
    },
  ];

  let ind = 0;

  const getActual = (idx) => {
    return parseInt(idx) == 2 ? "Прошедние" : "Планируются";
  };

  const handleChangeYear = (e) => {
    if (e.target.value !== "") {
      setBtnClass("personal_card__btn btn ");
      setDisabledStatus(false);
    } else {
      setBtnClass("personal_card__btn btn btn--no-active");
      setDisabledStatus(true);
    }
    setYear(e.target.value);
  };

  const handleChangeOrg = (e) => {
    console.log(e.target.value);
    if (e.target.value == 2) {
      setDisabledCenters(false);
    } else {
      setDisabledCenters(true);
    }

    setOrganizationId(e.target.value);
  };

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value);
  };

  const handleChangeCenter = (e) => {
    setCenterId(e.target.value);
  };

  const handleChangeActual = (e) => {
    setActual(e.target.value);
  };

  const submitEvents = async (e) => {
    e.preventDefault();
    const event = {
      year,
      month,
      categoryId,
      organizationId,
      centerId,
      actual,
    };

    try {
      const formData = new FormData();

      formData.append("event", JSON.stringify(event));

      const cookies = getCookie();

      setEnrollers([]);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/report/enrollers_list`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + cookies["token_statipkro"],
          },
        }
      );

      console.log(data);

      if (data.code === 403) {
        navigate("/login");
      } else if (data.code === 200) {
        setResult(true);

        setResYear(data.result.year);
        setResMonth(data.result.month);
        setResOrg(data.result.organizationId);
        setResCat(data.result.categoryId);
        setResCen(data.result.centerId);
        setResAmount(data.result.count);
        setResActual(data.result.actual);
        setEnrollers(data.result.enrollers);
        if (data.result.enrollers.length > 0) {
          setDisabledStatusExcel(false);
          setBtnClassExcel("btn btn--excel");
        }

        const notification = JSON.parse(localStorage.getItem("update"));

        if (notification) {
          setNotificationMsg(notification.msg);
          setVissibleNotif(notification.display);
          setVissibleNotifText(notification.displayText);
          setVissibleStatus(notification.status);
          setIDNotification("update");
        }
      }

      data.display = "vissible";
      data.displayText = "X";
      localStorage.setItem("update", JSON.stringify(data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const submitEnrollers = () => {};
  return (
    <div className="report__block">
      <div className="report__fiters">
        {/* Группа Мероприятия */}
        <div className="report__filter_group">
          <h2 className="report__heading">
            Отчет №3 «Список зарегистрировавшихся»
          </h2>
          <span className="report__description">
            Каждый фильтр представляет собой критерий отбора данных
          </span>

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
                <option className="report__option" value="">
                  Выбрать год
                </option>
                <option className="report__option" value="2024">
                  2024
                </option>
                <option className="report__option" value="2023">
                  2023
                </option>
                <option className="report__option" value="2022">
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
                <option className="report__option" value="all">
                  Все месяцы
                </option>
                <option className="report__option" value="1">
                  Январь
                </option>
                <option className="report__option" value="2">
                  Февраль
                </option>

                <option className="report__option" value="3">
                  Март
                </option>
                <option className="report__option" value="4">
                  Апрель
                </option>

                <option className="report__option" value="5">
                  Май
                </option>

                <option className="report__option" value="6">
                  Июнь
                </option>

                <option className="report__option" value="7">
                  Июль
                </option>

                <option className="report__option" value="8">
                  Август
                </option>

                <option className="report__option" value="9">
                  Сентябрь
                </option>

                <option className="report__option" value="10">
                  Октябрь
                </option>

                <option className="report__option" value="11">
                  Ноябрь
                </option>

                <option className="report__option" value="12">
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
                <option className="report__option" value="all">
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
                  );
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
                <option className="report__option" value="all">
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
                  );
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
                <option className="report__option" value="all">
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
                  );
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
                  );
                })}
              </select>
            </div>
          </div>

          <div className="report__tbl-header">
            {result !== false ? (
              <>
                <h2>Статистика участников за {year} год</h2>
                <span className="report__description">
                  Данные сформированы по выбранным критериям{" "}
                </span>
              </>
            ) : (
              <h2></h2>
            )}
          </div>

          {result !== false ? (
            <table width="100%" className="report__tbl report__tbl--full">
              <thead>
                <tr className="report__tbl_tr">
                  <th width="5%" className="report__tbl_td">
                    №:
                  </th>
                  <th width="20%" className="report__tbl_td ">
                    ФИО:
                  </th>
                  <th width="20%" className="report__tbl_td">
                    Район:
                  </th>
                  <th width="20%" className="report__tbl_td">
                    Место работы:
                  </th>
                  <th width="15%" className="report__tbl_td">
                    Должность:
                  </th>
                  <th className="report__tbl_td">Стаж работы:</th>
                  <th className="report__tbl_td">Адрес эл.почты:</th>
                  <th className="report__tbl_td">Номер телефона:</th>
                  <th className="report__tbl_td">Дата регистрации:</th>
                </tr>
              </thead>

              <tbody>
                {enrollers.map((e) => {
                  return (
                    <tr className="report__tbl_tr">
                      <td className="report__tbl_td">{++ind} </td>
                      <td className="report__tbl_td">
                        {e.Фамилия} {e.Имя} {e.Отчество}{" "}
                      </td>
                      <td className="report__tbl_td">{e["город/район"]} </td>
                      <td className="report__tbl_td">{e["Место работы"]} </td>
                      <td className="report__tbl_td">{e["Должность"]} </td>
                      <td className="report__tbl_td">{e["Стаж"]} </td>
                      <td className="report__tbl_td">{e["Эл. адрес"]} </td>
                      <td className="report__tbl_td">{e["Телефон"]} </td>
                      <td className="report__tbl_td">
                        {e["Дата регистрации"]}{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            ""
          )}

          <div className="personal_card__block_submit">
            <button
              className={btnClass}
              onClick={submitEvents}
              disabled={disabledStatus}
              type="submit"
            >
              Сгененрировать
            </button>
          </div>

          <button
            onClick={handleOnExport}
            disabled={disabledStatusExcel}
            className={btnClassExcel}
          >
            Экспорт в таблицу
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
