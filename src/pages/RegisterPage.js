import Header from "../components/header/Header";
import Registration from "../components/registration/Registration";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';


const RegisnterPage = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [areaList, setAreaList] = useState([])

  const getTitle = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/register/${id}`)
    setTitle(data.reg_form[0].title)
    setAreaList(data.list)
  }

  useEffect(() => {
    try {
      getTitle()
    } catch (e) {
      console.log(e.message);
    }
  }, [])

  return (
    <>
      <Header />
      <main className="main">
        <Registration id={id} title={title} areaList={areaList} />
      </main>
    </>
  );
};

export default RegisnterPage;
