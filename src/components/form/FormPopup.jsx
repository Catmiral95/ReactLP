import { Form } from "../contacts/Contacts";

export default function FormPopup() {
  return(
    <dialog aria-label='Форма для связи' open="open">
        <h2>Связаться с нами</h2>
        <Form />
   </dialog>
  )
}
