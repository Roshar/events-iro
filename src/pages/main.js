import Header from "../components/header/Header";
const Home = () => {
    return (
        <>
            <Header />
            <Filters />
            <main className="main">
                <h1 className="visually-hidden">Мероприятия</h1>
                <h2 className="title-1">
                    Скоро
                </h2>
            </main>;
        </>
    )


    export default Home;