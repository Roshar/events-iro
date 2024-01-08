import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header/Header";
import { NavLink } from "react-router-dom";
import API from "../API/api";

const SearchEventPage = () => {
  const [resultData, setResultData] = useState([]);
  const [searchVal, setSearchVal] = useState([]);

  const searchHandler = async (el) => {
    if (el.target.value.length > 1) {
      let result = await API.get(
        `${process.env.REACT_APP_BASE_URL}/events/getsearchresult/${el.target.value}`
      );

      setResultData(result.data);
      if (result.data.length > 0) {
      }
    } else if (el.target.value.length < 1) {
      setResultData([]);
    }
    console.log(resultData);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="search_container">
            <div className="search_input">
              <input
                type="text"
                className="search_input_field"
                onChange={searchHandler}
                placeholder="Начните вводить название"
              />
            </div>
            <ul className="search_result_list list-reset">
              {resultData.length > 0
                ? resultData.map((el) => {
                    return (
                      <li className="search_result_item" key={el.id_uniq}>
                        <NavLink to={`/event/${el.id_uniq}`}>
                          {el.title}
                        </NavLink>
                      </li>
                    );
                  })
                : "По вашему запросу ничего не найдено"}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchEventPage;
