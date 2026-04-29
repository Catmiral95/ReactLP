import { HashLink } from "react-router-hash-link";

export default function Navbar({ handleDialogClick }) {
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
      {menu.map((item) => (
        <>
          <HashLink
            to={`/` + item.link}
            key={item.id}
            smooth
            onClick={handleDialogClick}
          >
            {item.name}
          </HashLink>
          {item.id !== 5 && <hr />}
        </>
      ))}
    </nav>
  );
}
