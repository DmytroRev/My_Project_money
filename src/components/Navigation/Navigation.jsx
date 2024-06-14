import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/history">History</NavLink>
          </li>
          <li>
            <NavLink to="/charts">Pie Charts</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
