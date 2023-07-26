import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";


const SpeakerPageAdd = ({ id }) => {


    useEffect(() => {

    }, [])
    return (<>
        <Header />
        <main className="main">
            <div className="container--personal-card">

            </div>
        </main>
    </>);
}

export default SpeakerPageAdd;