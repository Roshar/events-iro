import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";


const EventPageEdit = () => {
    const { id } = useParams()
    const [event, setEvent] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/event/edit/${id}`).then((response) => {
            setEvent(response.data)
        });
    }, []);

    console.log(event);
    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <div className="admin_event">
                        <form className="admin_event__form">
                            <div className="admin_event__form-control">
                                <input type="text" className="admin_event__input" value='' />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default EventPageEdit;