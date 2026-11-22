import "./header_and_navbar.css";
import Navbar from "./Navbar.jsx";
import { useRef, useEffect, useState } from "react";
import { useWindowWidth } from "../../context/WindowWidth.jsx";
import logo from "../../assets/images/logo.svg";
import logo0 from "../../assets/images/logo0.png";
import burgerMenu from "../../assets//images/burger_menu.svg";

export default function Header() {
  const windowWidth = useWindowWidth();
  const dialogRef = useRef(null);
  const isMobile = windowWidth <= 1200;
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleDialogClick = () => {
    setTimeout(() => {
      dialogRef.current.close();
    }, 500);
  };

  const openDialog = () => dialogRef.current.showModal();

  useEffect(() => {
    //исчезающая кнопка меню при скролле вниз
    const handleScroll = () => {
      let moving = window.pageYOffset;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const cls = visible ? "visibleBtn" : "hiddenBtn";
  const mobile = (
    <>
      <div className={`burger-container row`}>
        <button
          name="burger-menu"
          id="menu-mobile"
          aria-label="menu"
          type="button"
          onClick={openDialog}
        >
          <img src={burgerMenu} alt="menu" />
        </button>
      </div>
      <dialog
        className={`col menu-dialog `}
        ref={dialogRef}
        onClick={handleDialogClick}
      >
        <img src={logo} alt="Лого Лидер Права" />

        <Navbar />
      </dialog>
    </>
  );
  const desktop = (
    <>
      <img src={logo0} alt="лого Лидер Права" />
      <div className={"row navbar_container"}>
        <Navbar onClick={handleDialogClick} />
        <div className="hours-and-phone-container col">
          <p id="working-hours">пн-пт 9:00 - 18:00</p>
          <p>
            <a href="tel:+79603128406" title="Телефон для связи">
              +7(960)312-84-06
            </a>
          </p>
        </div>
      </div>
    </>
  );

  return (
    <header className={`row ${isMobile && `mobile-header ${cls}`} `}>
      {!isMobile ? desktop : mobile}
    </header>
  );
}
