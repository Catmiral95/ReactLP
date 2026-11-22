import { HashLink } from "react-router-hash-link";
import menu from "../../data/dataMenu.json";

export default function Navbar({ handleDialogClick }) {
  return (
    <nav className="container">
      <ul className="container">
        {menu.map((item) => (
          <li className="container" key={item.id}>
            <HashLink to={`/` + item.link} smooth onClick={handleDialogClick}>
              {item.name}
            </HashLink>
            {item.id !== 5 && <hr />}
          </li>
        ))}
      </ul>
    </nav>
  );
}
