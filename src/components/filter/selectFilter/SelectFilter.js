

import React, { useState, useEffect } from "react";
import './../style.css';

const SelectFilter = ({ onChange }) => {

    const [category, setCategory] = useState("")

    const handleCategory = (event) => {
        onChange(event.target.value) // callback-функция
    }

    // const handleCategory = (e) => {
    //     setCategory(e.target.value)
    //     console.log(e.target.value)
    // }

    return (

        <select name="category" id="category_id" className="filters__select" onChange={handleCategory}>
            <option value="" className="filters__option">Категория</option>
            <option value="1" className="filters__option">Семинар</option>
            <option value="2" className="filters__option">Конференция</option>
            <option value="3" className="filters__option">Лекция</option>
            <option value="4" className="filters__option">Форум</option>
            <option value="5" className="filters__option">Курсы</option>
            <option value="6" className="filters__option">Круглый стол</option>
            <option value="7" className="filters__option">Мастер-класс</option>
            <option value="8" className="filters__option">Тренинг</option>
            <option value="9" className="filters__option">Практикум</option>
            <option value="10" className="filters__option">Конкурс</option>
            <option value="11" className="filters__option">Вебинар</option>
            <option value="12" className="filters__option">Статегическая сессия</option>
            <option value="13" className="filters__option">Иное</option>
        </select>

    );
}

export default SelectFilter;