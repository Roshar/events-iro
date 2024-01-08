import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import checkAdminRole from "../../../utils/sendHeaders";

import uploadIcon from "./../../../img/icons/412975601606261173.svg";
import getCookie from "./../../../utils/getCookies";

import Header from "../../../components/header/Header";
import checkImgSize from "../../../utils/checkImgSize";
import ImgBlockError from "../../../components/imgBlockError/ImgBlockError";
import setSuccess from "../../../utils/setSucces";
import setError from "../../../utils/setError";
import AdminMenu from "../../../components/adminMenu/AdminMenu";

const SpeakerPageAdd = () => {
  const navigate = useNavigate();

  const [showBlock, setShowBlock] = useState("none");
  const [genderList, setGenderList] = useState([]);
  const [speaker, setSpeaker] = useState({
    firstname: "",
    surname: "",
    patronymic: "",
    position: "",
    company: "",
  });
  const [gender, setGender] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [file, setFile] = useState("man.jpg");

  const checkError = () => {
    return document.querySelectorAll(".error");
  };

  const firstname_i = document.getElementById("firstname");
  const surname_i = document.getElementById("surname");
  const position_i = document.getElementById("position");
  const company_i = document.getElementById("company");

  const validateInputs = () => {
    const firstnameVal = firstname_i.value.trim();
    const surnameVal = surname_i.value.trim();
    const positionVal = position_i.value.trim();
    const companyVal = company_i.value.trim();

    if (firstnameVal === "") {
      setError(firstname_i, "Поле необходимо заполнить");
    } else {
      setSuccess(firstname_i);
    }

    if (surnameVal === "") {
      setError(surname_i, "Поле необходимо заполнить");
    } else {
      setSuccess(surname_i);
    }

    if (positionVal === "") {
      setError(position_i, "Поле необходимо заполнить");
    } else {
      setSuccess(position_i);
    }

    if (companyVal === "") {
      setError(company_i, "Поле необходимо заполнить");
    } else {
      setSuccess(company_i);
    }
  };

  const imgClick = () => {
    document.querySelector("#fileBtn").click();
  };

  const getSpeakerPageAdd = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/speaker`,
      checkAdminRole()
    );
    console.log(data);
    if (data.code === 403) {
      navigate("/login");
    } else {
      setGenderList(data);
    }
    setFile(`${process.env.REACT_APP_BASE_IMG_URL}/avatars/${file}`);
  };

  useEffect(() => {
    getSpeakerPageAdd();
  }, []);

  function handleChange2(e) {
    if (e.target.files.length > 0) {
      if (checkImgSize(e.target.files[0].size)) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setAvatar(e.target.files[0]);
        setShowBlock("none");
      } else {
        setShowBlock("block");
      }
    }
  }

  const handleChange = (e) => {
    setSpeaker((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitFunc = async (e) => {
    e.preventDefault();

    validateInputs();

    const errorCount = checkError();

    if (errorCount.length < 1) {
      const formData = new FormData();
      formData.append("speaker", JSON.stringify(speaker));

      formData.append("file", avatar);

      const cookies = getCookie();
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/speaker/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + cookies["token_statipkro"],
          },
        }
      );
      navigate(`/admin/speakers`);

      data.display = "vissible";
      data.displayText = "X";
      localStorage.setItem("update", JSON.stringify(data));
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="container--personal-card">
          <AdminMenu />
          <ImgBlockError status={showBlock} />
          <div className="personal_card">
            <div className="personal_card__img-box">
              <img src={file} alt="" className="personal_card__img" />
              <img
                src={uploadIcon}
                className="personal_card__icon_edit"
                alt=""
                onClick={imgClick}
              />
            </div>

            <div className="personal_card__main_info">
              <form action="" className="personal_card__form" id="form">
                <input
                  className="img_event__input--hidden"
                  id="fileBtn"
                  type="file"
                  name="file"
                  form="test"
                  onChange={handleChange2}
                  accept=".jpg, .jpeg, .png"
                />
                <div className="personal_card__block">
                  <label className="personal_card__label" htmlFor="surname">
                    Фамилия:
                  </label>
                  <input
                    className="personal_card__input"
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={handleChange}
                  />
                  <span className="notif"> </span>
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
                    onChange={handleChange}
                  />
                  <span className="notif"> </span>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                  <span className="notif"> </span>
                </div>

                <div className="personal_card__block">
                  <label className="personal_card__label" htmlFor="company">
                    Пол:
                  </label>
                  <select
                    className="personal_card__select"
                    name="category_id"
                    id="category_id"
                    onChange={handleChange}
                  >
                    {genderList.map((el) => {
                      return (
                        <option
                          className="admin_event__option"
                          key={el.id}
                          value={el.id}
                        >
                          {el.title}
                        </option>
                      );
                    })}
                  </select>
                  <span className="notif"> </span>
                </div>

                <div className="personal_card__block_submit">
                  <button
                    className="personal_card__btn btn"
                    onClick={submitFunc}
                    type="submit"
                  >
                    Добавить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SpeakerPageAdd;
