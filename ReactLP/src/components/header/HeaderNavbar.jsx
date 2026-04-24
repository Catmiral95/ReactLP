import "./header_and_navbar.css";
import Navbar from "./Navbar.jsx";
import { useRef, useEffect, useState } from "react";

export default function Header({ windowWidth }) {
  const dialogRef = useRef(null);
  const isMobile = windowWidth <= 1200;
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleDialogClick = () => {
    setTimeout(() => {
      dialogRef.current.close();
    }, 200);
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

  return (
    <header className={`row ${isMobile && `mobile-header ${cls}`}`}>
      {!isMobile ? (
        <>
          <img
            src={process.env.PUBLIC_URL + "/images/logo0.png"}
            alt="лого Лидер Права"
          />
          <div className={"row navbar_container"}>
            <Navbar onClick={handleDialogClick} />
            <div className="hours-and-phone-container col">
              <p id="working-hours">пн-пт 9:00 - 18: 00</p>
              <p>
                <a href="tel:+79613467077" title="Телефон для связи">
                  +7(961)346-70-77
                </a>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="burger-container row">
            <button
              name="burger-menu"
              id="menu-mobile"
              aria-label="menu"
              type="button"
              onClick={openDialog}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/burger_menu.svg"}
                alt="menu"
              />
            </button>
          </div>
          <dialog
            className="col menu-dialog"
            ref={dialogRef}
            onClick={handleDialogClick}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/logo.svg"}
              alt="Лого Лидер Права"
            />
            <Navbar />
          </dialog>
        </>
      )}
    </header>
  );
}
