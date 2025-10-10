import "./contacts.css";
import { useState } from "react";

function Contacts() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Валидация email
    if (value === "") {
      setIsValidEmail(true); // Пустое поле - валидно
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(value));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    // Валидация телефона
    if (value === "") {
      setIsValidPhone(true); // Пустое поле - валидно
    } else {
      const phoneRegex =
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      const cleanValue = value.replace(/\D/g, "");
      const hasValidLength =
        cleanValue.length === 11 || cleanValue.length === 10;

      setIsValidPhone(phoneRegex.test(value) && hasValidLength);
    }
  };

  //отправка формы

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // Для отображения статуса отправки

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Отправка...");

    try {
      const response = await fetch("http://localhost:3001/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Сообщение успешно отправлено!");
        setFormData({ name: "", phone: "", email: "", topic: "", message: "" }); // Очистить форму
      } else {
        setStatus(`Ошибка: ${data.message}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setStatus("Произошла ошибка при отправке сообщения.");
    }
  };

  return (
    <>
      <h1>Контакты</h1>
      <img src="/images/diamondDecoration.svg" alt="декоративный элемент" />

      <div className="container" id="contactsContainer">
        <div className="info col">
          <div className="row">
            {/*Тут должна будет быть карта яндекса*/}
            <img src="/images/address.svg" alt="адрес" />
            <p>
              428003, Чувашская Республика, г. Чебоксары, ул. Афанасьева, д. 2,
              оф. 56.
            </p>
          </div>
          <div className="row">
            <img src="/images/workingHours.svg" alt="часы работы" />
            <p>пн-пт 9:00-18:00</p>
          </div>
          <div className="row">
            <img src="/images/phone.svg" alt="телефон" />
            <p>+7(961)346-70-77</p>
          </div>
          <div className="row">
            <img src="/images/owner.svg" alt="владелец" />
            <p>ИП Артемьев Артём Сергеевич</p>
          </div>
          <div className="readFeedback row">
            <p>Читайте отзывы о нас: </p>
            <a href="#">
              <img src="/images/yandex.svg" alt="яндекс отзывы" />
            </a>
            <a href="#">
              <img src="/images/2gis.svg" alt="2gis отзывы" />
            </a>
          </div>
        </div>

        <div className="col contactsDiv">
          <h2>Связаться с нами</h2>
          <p>
            Заполните форму, чтобы записаться на бесплатную консультацию или
            задать вопрос.
          </p>
          <form onSubmit={handleSubmit} className="col">
            <label htmlFor="name">
              Ф.И.О.
              <span className="asterisk">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Иванов Иван Иванович"
              required
            />

            <label htmlFor="phone">
              Телефон
              <span className="asterisk">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="+7(900)123-45-67"
              value={formData.phone}
              onChange={handleChange}
              style={{ borderColor: isValidPhone ? "initial" : "red" }}
              required
            />
            {!isValidPhone && phone && (
              <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
                Введите корректный номер телефона
              </p>
            )}

            <label htmlFor="email">Адрес электронной почты</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ivanovii@mail.com"
              value={formData.email}
              onChange={handleChange}
              style={{ borderColor: isValidEmail ? "initial" : "red" }}
            />
            {!isValidEmail && email && (
              <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
                Введите корректный email
              </p>
            )}

            <label htmlFor="topic">Тема сообщения</label>
            <select
              id="messageTopic"
              name="topic"
              type="topic"
              value={formData.topic}
              onChange={handleChange}
            >
              <option value="Запись на прием">Запись на прием</option>
              <option value="Оформление претензии">Оформление претензии</option>
              <option value="Представительство в суде">
                Представительство в суде
              </option>
              <option value="Сопровождение сделки">Сопровождение сделки</option>
              <option value="Юридическая консультация">
                Юридическая консультация
              </option>
              <option value="Другое">Другое</option>
            </select>

            <label htmlFor="message">
              Сообщение<span className="asterisk">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Текст сообщения"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button className="buttonGen" type="submit" name="submit">
              ОТПРАВИТЬ
            </button>
          </form>
          {status && (
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>{status}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Contacts;
