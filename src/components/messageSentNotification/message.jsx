import "./message.css";

export default function Message() {
  return (
    <dialog className="message">
      <img
        src={process.env.PUBLIC_URL + "/images/tickMark.svg"}
        alt="Галочка"
      ></img>
      <p>Заявка отправлена</p>
    </dialog>
  );
}
