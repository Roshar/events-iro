import Header from "../components/header/Header";
import Registration from "../components/registration/Registration";
import { useParams } from 'react-router-dom'


const ResultPage = () => {
    const { id } = useParams()
    console.log(id);
    console.log(JSON.parse(localStorage.getItem(id)))

    return (
        <>
            <Header />
            <main className="main">
                <h2> Вы успешно зарегистрированы!</h2>
            </main>
        </>
    );
};

export default ResultPage;
