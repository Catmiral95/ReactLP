import "./contacts.css";
import { useState } from "react";
import { Link } from "react-router";

export default function Contacts({ windowWidth }) {
  const isMobile = windowWidth <= 1200;
  return (
    <section id="contacts" className="col">
      <h1>Контакты</h1>
      <p>
        Заполните форму, чтобы записаться на бесплатную консультацию или задать
        вопрос.
      </p>
      <div className="container" id="contactsContainer">
        {/*Содержит левую часть - контакты, карту и "читайте о нас" */}
        <div className="info col vcard">
          {!isMobile ? (
            <iframe
              src="https://yandex.ru/map-widget/v1/org/lider_prava/34845163518/?from=mapframe&ll=47.260332%2C56.145045&z=13.84"
              frameborder="1"
              width="500"
              height="400"
              allowfullscreen="false"
              style={{ position: "relative", width: "100%" }}
            ></iframe>
          ) : (
            <iframe
              src="https://yandex.ru/map-widget/v1/org/lider_prava/34845163518/?from=mapframe&ll=47.260332%2C56.145045&z=13.84"
              frameborder="1"
              width="250"
              height="250"
              allowfullscreen="false"
              style={{ position: "relative", width: "90%" }}
            ></iframe>
          )}

          <br />

          <div
            className="col"
            style={{ alignItems: "flex-start", gap: "0.1lh" }}
          >
            <div className="row">
              <img
                src={process.env.PUBLIC_URL + "/images/address.svg"}
                alt="адрес"
              />
              <p
                style={{
                  alignItems: "flex-start",
                }}
                className="adr col"
              >
                <span className="postal-code">428003</span>
                <span className="region">Чувашская Республика</span>
                <span className="locality"> г. Чебоксары </span>
                <span className="street-address">
                  ул. Афанасьева, д. 2, оф. 56.
                </span>
              </p>
            </div>
            <div className="row">
              <img
                src={process.env.PUBLIC_URL + "/images/workingHours.svg"}
                alt="часы работы"
              />
              <p className="workhours">пн-пт 9:00-18:00</p>
            </div>
            <div className="row phone-info">
              <img
                src={process.env.PUBLIC_URL + "/images/phone.svg"}
                alt="телефон"
              />
              <a
                href="tel:+79613467077"
                style={{ textDecoration: "none" }}
                title="Телефон для связи"
                className="tel"
              >
                +7(961)346-70-77
              </a>
            </div>
            <div className="row mail-info">
              <img
                src={process.env.PUBLIC_URL + "/images/mail.svg"}
                alt="почта"
              />
              <a
                href="mailto:liderprava@ya.ru"
                style={{ textDecoration: "none" }}
                title="Почта для связи"
                className="email"
              >
                liderprava21@ya.ru
              </a>
            </div>
            <div className="row">
              <img
                src={process.env.PUBLIC_URL + "/images/owner.svg"}
                alt="владелец"
              />
              <p>ИП Артемьев Артём Сергеевич</p>
            </div>
          </div>
          <br />

          <div className="readFeedback row">
            <p>Читайте отзывы о нас: </p>
            <a
              href="https://yandex.ru/maps/org/lider_prava/34845163518/reviews/?ll=50.123226%2C55.641204&z=7"
              title="Отзывы на Яндексе"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/yandex.svg"}
                alt="Яндекс отзывы"
              />
            </a>
            <a
              href="https://2gis.ru/cheboksary/firm/70000001053905641/tab/reviews"
              title="Отзывы на 2гис"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/2gis.svg"}
                alt="2gis отзывы"
              />
            </a>
            <br />
          </div>
        </div>
        <div className="col formDiv">
          <Form />
        </div>
      </div>
    </section>
  );
}

export function Form() {
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [status, setStatus] = useState("");
  const [submitAnimation, setSubmitAnimation] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    messageTopic: "Запись на прием",
    message: "",
    order: "",
  });

  const validatePhone = (event) => {
    let phone = event.target;
    setIsValidPhone(!phone.checkValidity() ? false : true);
  };

  const validateEmail = (event) => {
    let email = event.target;
    setIsValidEmail(!email.checkValidity() ? false : true);
  };

  const animateSubmit = () => {
    setSubmitAnimation({
      animation: " fly 0.6s ease-in forwards",
      pointerEvents: "none",
    });
    setTimeout(() => {
      setSubmitAnimation({});
    }, 600);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkBeforeSending = () => {
    if (
      isValidEmail == true &&
      isValidPhone == true &&
      formData.message &&
      formData.name
    ) {
      console.log("YES");
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Отправка...");
    if (!checkBeforeSending) {
      throw new Error("Не все данные заполнены корректно");
    }

    try {
      const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Сообщение успешно отправлено!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          messageTopic: "Запись на прием",
          message: "",
          order: "",
        });
        animateSubmit();
      } else {
        setStatus("Ошибка при отправке.");
      }
    } catch (error) {
      setStatus("Ошибка соединения с сервером.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="col" method="post">
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
        type="tel"
        pattern="^(\+7|7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$"
        placeholder="+7(900)123-45-67 или 89001234567"
        value={formData.phone}
        onChange={handleChange}
        onBlur={validatePhone}
        style={{ borderColor: isValidPhone ? "initial" : "red" }} //окрашивает край в красный, только если телефон введен и введен некорректно
        required
      />
      {!isValidPhone && (
        <small style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          Введите корректный номер телефона
        </small>
      )}

      <label htmlFor="email">Адрес электронной почты</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="ivanovii@mail.com"
        value={formData.email}
        onChange={handleChange}
        onBlur={validateEmail}
        style={{ borderColor: isValidEmail ? "initial" : "red" }} //окрашивает край в красный, только если почта введена и введена некоррентно
      />
      {!isValidEmail && (
        <small style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          Введите корректный email
        </small>
      )}

      <label htmlFor="messageTopic">Тема сообщения</label>
      <select
        id="messageTopic"
        name="messageTopic"
        type="topic"
        value={formData.messageTopic}
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
      <input
        id="order" //хани поттер и тайное поле
        type="text"
        name="order"
        onChange={handleChange}
        value={formData.order}
        className="order"
      ></input>
      <small>
        <span className="asterisk">*</span>Поля, обязательные к заполнению
      </small>
      <small className="disclaimer">
        Нажимая кнопку, я подтверждаю, что ознакомлен(а) и принимаю условия
        <Link to="/privacy_policy" className="links">
          {" "}
          Политики Конфиденциальности
        </Link>{" "}
        и соглашаюсь на{" "}
        <Link to="/consent" className="links">
          обработку персональных данных
        </Link>
        .
      </small>
      <button type="submit" name="submit" className="buttonGen submitButton">
        <div className={`svg-wrapper`} style={submitAnimation}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="white"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            ></path>
          </svg>
        </div>
        <span style={submitAnimation}>отправить</span>
      </button>
      <p className="submit-status">{status}</p>
    </form>
  );
}
