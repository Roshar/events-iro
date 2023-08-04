import { NavLink } from "react-router-dom";
import homeIcon from "./../../img/icons/admin/webpagehome_85808.svg";
import peopleIcon from "./../../img/icons/admin/people_group_icon_188185.svg";
import reportIcon from "./../../img/icons/admin/report-svgrepo-com.svg";

import changeIcon from "./../../img/icons/admin/1486564391-compose_81525.svg";
import offIcon from "./../../img/icons/admin/1486564389-lock-red_81516.svg";
import deleteIcon from "./../../img/icons/admin/1486564399-close_81512.svg";

const AdminMenu = () => {
  return (
    <aside className="aside">
      <ul className="aside__subnav subnav-list list-reset">
        <li className="subnav-list__element">
          <NavLink className="subnav-list__link" to={`/admin`}>
            {" "}
            <img
              src={homeIcon}
              className="subnav-list__icon"
            ></img> Мероприятия{" "}
          </NavLink>{" "}
        </li>
        <li className="subnav-list__element">
          <NavLink className="subnav-list__link" to={`/admin/speakers`}>
            {" "}
            <img
              src={peopleIcon}
              className="subnav-list__icon"
            ></img> Спикеры{" "}
          </NavLink>{" "}
        </li>
        <li className="subnav-list__element">
          <NavLink className="subnav-list__link" to={`/admin/enrollers`}>
            {" "}
            <img src={peopleIcon} className="subnav-list__icon"></img>
            Пользователи
          </NavLink>
        </li>
        <li className="subnav-list__element">
          <NavLink className="subnav-list__link" to={`/admin/reports`}>
            {" "}
            <img src={reportIcon} className="subnav-list__icon"></img>
            Отчетность
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default AdminMenu;
