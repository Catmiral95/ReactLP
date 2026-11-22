import Form from "./Form.jsx";
import { forwardRef } from "react";
import styles from "./formPopup.module.css";
import close from "../../assets/images/closeSign.svg";

const FormPopup = forwardRef((_props, ref) => {
  const closeForm = (_e) => {
    if (ref.current) {
      ref.current.close();
    }
  };

  return (
    <dialog
      aria-label="Форма для связи"
      closedby="any"
      className={styles.dialog}
      ref={ref}
    >
      <div className={styles.container}>
        {/*<div className="empty" aria-hidden="true"></div>*/}
        {/*div выше нужен исключительно для распределения компонентов в строке */}
        <h2 className={styles.h2}>Связаться с нами</h2>
        <img
          alt="Закрыть"
          role="button"
          src={close}
          className={styles.img}
          onClick={closeForm}
        />
      </div>
      <div className="col">
        <Form />
      </div>
    </dialog>
  );
});

export default FormPopup;
