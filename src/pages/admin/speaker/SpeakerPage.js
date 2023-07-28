import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import Header from "./../../../components/header/Header";
import Speaker from "./../../../components/speaker/Speaker";
import AdminMenu from "../../../components/adminMenu/AdminMenu";


const SpeakerPageAdd = () => {

    const { id } = useParams();
    useEffect(() => {

    }, [])
    return (<>
        <Header />
        <main className="main">
            <div className="container--personal-card">
                <AdminMenu />
                <Speaker id={id} />
            </div>
        </main>
    </>);
}

export default SpeakerPageAdd;