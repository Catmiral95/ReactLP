import styles from "./hero.module.css";
import FormPopup from "../form/FormPopup";
import { useRef } from "react";
import contanctsHero from "../../data/dataContacts.json";

export default function Hero() {
  const dialogForm = useRef(null);
  const openDialog = () => dialogForm.current.showModal();

  return (
    <section className={`col ${styles.hero}`} id="heroPage">
      <div className="col">
        <div className="col">
          <h1 className={styles.h1}>Лидер права</h1>
          <h2 className={`${styles.h2} category`}>юридическая компания</h2>
        </div>
        <br />
        <span className={styles.span}>Команда опытных профессионалов.</span>
        <br />
        <button
          className={`buttonGen row ${styles.button}`}
          onClick={openDialog}
        >
          <span>Бесплатная консультация</span>
          <img src={process.env.PUBLIC_URL + "/images/arrow.svg"} alt="arrow" />
        </button>
        <div className="row icons-container">
          {contanctsHero.map((item) => {
            if (item.name === "WhatsApp") return; // удалить в лучшие времена
            return (
              <a
                href={item.link}
                key={item.name}
                title={item.name}
                className={styles.a}
              >
                <img
                  className="icon"
                  src={process.env.PUBLIC_URL + item.image}
                  alt={item.name}
                />
              </a>
            );
          })}
        </div>
      </div>
      <FormPopup ref={dialogForm} />
    </section>
  );
}
