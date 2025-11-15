import { Form } from "../contacts/Contacts";
import { forwardRef } from 'react';

const FormPopup = forwardRef((props, ref) => {
  return(
    <dialog aria-label='Форма для связи' 
            closedby="any"
            className="dialog-form"
            ref={ref}
            >
        <h2>Связаться с нами</h2>
        <Form />
   </dialog>
  )
})

export default FormPopup