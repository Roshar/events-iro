
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Events from '../components/events/Events'
import SelectFilter from '../components/filter/selectFilter/SelectFilter';
import InputSearch from '../components/filter/inputSearch/InputSearch';
import Header from './../components/header/Header';
import { events } from '../helpers/eventListActual';
import { eventsLast } from '../helpers/eventListLast';




const Home = () => {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectOption, setSelectOption] = useState('');

    const state = useEffect(() => {
        axios.get(`https://my-json-server.typicode.com/typicode/demo/posts`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const filterSelect = (category) => {
        setSelectOption(category);
        if (category !== '') {
            const selectResult = APIData.filter((item) => {
                if (item.id === parseInt(category)) {
                    return item;
                }
            })
            console.log('before')
            console.log(selectResult)
            setFilteredResults(selectResult)
            console.log('after')

        }
        else {
            setFilteredResults(APIData);
        }

    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            console.log(filteredResults)
            const filteredData = filteredResults.filter((item) => {
                return Object.values(item.title).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }


    return (
        <>
            <Header />

            <article className="filters">
                <div className="filters__wrapper">
                    <div className="filters__header">
                        <SelectFilter func={filterSelect} />
                        <InputSearch val={searchItems} />

                    </div>
                </div>
            </article>

            <main className="main">

                <h1 className="visually-hidden">Мероприятия</h1>
                <h2 className="home-content__title">
                    Скоро
                </h2>
                <div className="events">
                    <div className="events__container">
                        {events.map((event) => {
                            return <Events key={event.id} id={event.id} category_name={event.category_name} statusText={event.statusText} title={event.title} img={event.img} date_event={event.date_event} />
                        })}

                        {searchInput.length > 1
                            || selectOption.length > 0 ?
                            (filteredResults.map((elem) => {
                                return elem.title
                            })) : (APIData.map((elem) => {
                                return elem.title
                            }))}

                    </div>
                    {APIData.length === 0}
                </div>

                <h2 className="home-content__title">
                    Прошедшие мероприятия
                </h2>
                <div className="events">
                    <div className="events__container">
                        {eventsLast.map((event) => {
                            return <Events key={event.id} id={event.id} category_name={event.category_name} statusText={event.statusText} title={event.title} img={event.img} date_event={event.date_event} status_event='last' />
                        })}
                    </div>
                </div>

            </main>;
        </>
    )
}

export default Home;