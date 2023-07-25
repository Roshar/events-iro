import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../components/login/Login'
import Header from '../components/header/Header';



const LoginPage = () => {

    return (
        <>
            <Header />
            <main className="main">
                <Login />
            </main>
        </>

    );
}

export default LoginPage;