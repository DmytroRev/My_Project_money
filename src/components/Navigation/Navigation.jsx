import { NavLink } from "react-router-dom";
import { MdAddHome, MdHistory } from "react-icons/md";
import { FaChartPie } from "react-icons/fa6";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header className={css.container}>
      <nav>
        <ul className={css.list}>
          <li>
            <NavLink to="/" className={css.btn}>
              <MdAddHome size={25} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={css.btn}>
              <MdHistory size={25} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/charts" className={css.btn}>
              <FaChartPie size={25} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
