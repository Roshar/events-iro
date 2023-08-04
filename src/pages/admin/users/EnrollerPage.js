
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import Header from "./../../../components/header/Header";
import Enroller from "./../../../components/enroller/Enroller";
import AdminMenu from "../../../components/adminMenu/AdminMenu";


const EnrollerPage = () => {

    const { id } = useParams();
    useEffect(() => {

    }, [])

    return (<>
        <Header />
        <main className="main">
            <div className="container--personal-card">
                <AdminMenu />
                <Enroller id={id} />
            </div>
        </main>
    </>);
}

export default EnrollerPage;