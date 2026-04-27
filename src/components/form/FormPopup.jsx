import { Form } from "../contacts/Contacts";
import { forwardRef } from "react";

const FormPopup = forwardRef((props, ref) => {
  const closeForm = (e) => {
    if (ref.current) {
      ref.current.close();
    }
  };

  return (
    <dialog
      aria-label="Форма для связи"
      closedby="any"
      className="dialog-form"
      ref={ref}
    >
      <div className="row h2-btn-container">
        <div className="empty" aria-hidden="true"></div>
        {/*div выше нужен исключительно для распределения компонентов в строке */}
        <h2>Связаться с нами</h2>
        <img
          role="button"
          src={process.env.PUBLIC_URL + "/images/closeSign.svg"}
          className="close-btn"
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
