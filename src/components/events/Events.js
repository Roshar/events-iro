import { NavLink } from "react-router-dom";
import "./style.css";

const Events = ({
  id,
  category_name,
  title,
  date_event,
  img,
  statusText,
  status_event,
}) => {
  const classValue = {
    statusStyle: "event-card__registration event-card__registration--opened",
    imgStyle: "event-card__img ",
    catBox: "event-card__category-box ",

  };



  if (status_event === "last") {
    classValue.statusStyle =
      "event-card__registration event-card__registration--close";
    classValue.imgStyle = "event-card__img event-card__img--last";
    classValue.imgStyle = "event-card__img event-card__img--last";
    classValue.catBox = "event-card__category-box--last";
  }

  return (
    <div className="event-card">
      <div className="event-card__header">
        <div className={classValue.catBox}>
          <p className="event-card__category-title">{category_name}</p>
        </div>
        <NavLink className="event-card__link" to={`event/${id}`}>
          <img src={img} alt={title} className={classValue.imgStyle} />
        </NavLink>
      </div>
      <div className="event-card__body">
        <span className="event-card__date">{date_event}</span>
        <NavLink className="event-card__title" to={`event/${id}`}>
          {title}
        </NavLink>

        <span className={classValue.statusStyle}>{statusText}</span>
      </div>
    </div>
  );
};

export default Events;
