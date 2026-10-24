import styles from "./consent.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Consent() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Проверяет localStorage при рендере компонента
    if (!localStorage.getItem("privacyPolicyAccepted")) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacyPolicyAccepted", "true");
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // обрабатывает клик вне окна консента
  const handleOutsideClick = (event) => {
    if (event.target.id === "privacyModal") {
      setShowModal(false);
    }
  };

  if (!showModal) {
    return null; // Если модальное окно не должно отображаться, не рендерим ничего
  }

  return (
    <div className={styles.container} onClick={handleOutsideClick}>
      <div>
        <p className={styles.p}>
          Вы используете сайт на условиях Соглашения об обработке персональных
          данных и Политики Конфиденциальности.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleAccept}>
            ОК
          </button>
          <Link to="/consent" className={`${styles.link} ${styles.button}`}>
            Соглашение
          </Link>
        </div>
      </div>
      <button className={`closeCross ${styles.close}`} onClick={handleClose}>
        <img
          src={process.env.PUBLIC_URL + "/images/closeSign.svg"}
          alt="Закрыть"
        />
      </button>
    </div>
  );
}
