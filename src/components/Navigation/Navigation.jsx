import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink>Home</NavLink>
          </li>
          <li>
            <NavLink>History</NavLink>
          </li>
          <li>
            <NavLink>Pie Charts</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
