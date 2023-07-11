import Header from "../components/header/Header";
import Registration from "../components/registration/Registration";
import { useParams } from 'react-router-dom'


const RegisnterPage = () => {
  const { id } = useParams()




  return (
    <>
      <Header />
      <main className="main">
        <Registration id={id} />
      </main>
    </>
  );
};

export default RegisnterPage;
