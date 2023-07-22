import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const EventHeader = ({ id, status, date, hour, enrollers, picture_name }) => {

    const [img, setImg] = useState(picture_name)

    console.log(img);
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

                    <span className="event__members">Количество участников: {enrollers.amount}</span>

                </div>
            </div>
        </div>
    );
}

export default EventHeader;