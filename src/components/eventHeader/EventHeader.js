import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const EventHeader = ({ id, status, date, hour, enrollers, picture_name, participants_number }) => {

    const [img, setImg] = useState(picture_name)



    const par_number = (num) => {

        if (participants_number !== null) {
            return (
                <div>
                    <span className="event__part color_white">Рассчитано на количество человек:</span>  <span className="color_white">{participants_number}</span>
                </div>
            )
        }

    }


    const setBtnStatus = (status) => {
        if (status === 1) {
            return <NavLink
                className="event__register"
                aria-label="button"
                to={`/register/${id}`}
            >
                Зарегистрироваться
            </NavLink>
        } else {
            return <button
                className="event__register event__register--close"
                aria-label="button"
                disabled
            >
                Регистрация закрыта
            </button>
        }
    }
    // url(http://localhost:3000/static/media/event_bg.0c279f154bd3c7087fec.jpg no-repeat center center fixed) 
    return (
        <div className="event__header" style={{
            backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/img/event_images/${picture_name} )`,
            minHeight: "520px",
            backgroundSize: "cover",
            position: "relative"
        }}>
            <div className="container">
                <div className="event__short-info">
                    <span className="event__date">{date}, {hour}</span>

                    {setBtnStatus(status)}

                    <div className="event__second_info_box">
                        <div> <span className="event__members color_white">Количество участников:</span>   <span className="color_white">{enrollers.amount}</span> </div>

                        {par_number()}
                    </div>



                </div>
            </div>
        </div>
    );
}

export default EventHeader;