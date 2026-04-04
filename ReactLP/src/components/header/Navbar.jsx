/*
export default function Navbar({ onLinkClick }) {
  return (
    <nav className="container">
      {menu.map((item) => (
        <MenuItem
          name={item.name}
          link={item.link}
          key={item.id}
          id={item.id}
          length={menu.length}
          onLinkClick={onLinkClick}
        />
      ))}
    </nav>
  );
}

function MenuItem(props) {
  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");

    // Закрываем диалог
    if (props.onLinkClick) {
      // Берем из props
      props.onLinkClick();
    }

    // Навигация после закрытия диалога
    setTimeout(() => {
      window.location.hash = href;
    }, 100);
  };

  return (
    <div className="container">
      <a href={props.link} onClick={handleLinkClick} title={props.name}>
        {props.name}
      </a>
      {props.id !== props.length && <hr />}
    </div>
  );
}
*/
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const menu = [
    {
      name: "Главная",
      link: "#heroPage",
      id: 1,
    },
    {
      name: "О нас",
      link: "#about",
      id: 2,
    },
    {
      name: "Услуги",
      link: "#legalFees",
      id: 3,
    },
    {
      name: "Кейсы",
      link: "#cases",
      id: 4,
    },
    {
      name: "Контакты",
      link: "#contacts",
      id: 5,
    },
  ];

  return (
    <nav className="container">
      {menu.map((item) => (<>
        <HashLink to={`/` + item.link} key={item.id} smooth>
          {item.name}
        </HashLink> {item.id !== 5 && <hr />}</>
      ))}
    </nav>
  );
}
