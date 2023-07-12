import Header from "../components/header/Header";
import Registration from "../components/registration/Registration";
import { useParams } from 'react-router-dom'
import { NavLink } from "react-router-dom";


const ResultPage = () => {
    const { id } = useParams()
    const { data } = JSON.parse(localStorage.getItem(id))

    const checkPage = (code, id) => {
        if (code === 200) {
            return (
                <NavLink to="/" className="notification__link">
                    Вернуться на главную страницу.
                </NavLink>
            )
        }
        return (

            <NavLink to={`/register/${id}`} className="notification__link">
                Попробовать заново зарегистрироваться
            </NavLink>
        )
    }

    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <div className="notification">
                        <h2 className="notification__msg">
                            {data.msg}
                        </h2>
                        <div className="notification__subtitle">
                            {checkPage(data.status, data.event_id)}
                        </div>
                    </div>

                </div>

            </main>
        </>
    );
};

export default ResultPage;
