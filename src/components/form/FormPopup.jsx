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
      <img
        role="button"
        src={process.env.PUBLIC_URL + "/images/closeSign.svg"}
        className="close-btn"
        onClick={closeForm}
      />
      <h2>Связаться с нами</h2>

      <Form />
    </dialog>
  );
});

export default FormPopup;
