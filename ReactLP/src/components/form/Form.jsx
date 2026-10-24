import { useState, useCallback } from "react";
import { Link } from "react-router";
import styles from "./form.module.css";
import { SmartCaptcha } from "@yandex/smart-captcha";

export default function Form() {
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [status, setStatus] = useState("");
  const [submitAnimation, setSubmitAnimation] = useState({});
  const [token, setToken] = useState(""); //для капчи
  const [resetCaptcha, setResetCaptcha] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    messageTopic: "Запись на прием",
    message: "",
    order: "",
  });

  const validatePhone = (event) => {
    const phone = event.target;
    setIsValidPhone(!phone.checkValidity() ? false : true);
  };

  const animateSubmit = () => {
    setSubmitAnimation({
      animation: "fly 0.6s ease-in forwards",
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
    //найти, почему не используется, или удалить
    if (isValidPhone === true) {
      console.log("YES");
      return true;
    } else {
      return false;
    }
  };

  const isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const API_URL = isDevelopment ? "http://localhost:5000/api" : "/api";

  //для капчи
  const handleResetCaptcha = () => setResetCaptcha((prev) => prev + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          //messageTopic: formData.messageTopic,
          message: formData.message,
          order: formData.order,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("✓ Сообщение успешно отправлено!");
        // Очищаем форму
        setFormData({
          name: "",
          phone: "",
          email: "",
          //messageTopic: "Запись на прием",
          message: "",
          order: "",
        });
        //анимирует самолетик на кнопке
        animateSubmit();
        // Через 5 секунд убираем сообщение
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(`✗ ${data.error}`);
        setTimeout(() => setStatus(""), 5000);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      handleResetCaptcha();
      setStatus("✗ Ошибка соединения. Попробуйте позже.");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  // -- HANDLESUBMIT

  return (
    <form
      onSubmit={handleSubmit}
      className={`col ${styles.form}`}
      method="post"
    >
      <p className={styles.p}>
        Обратите внимание, что бесплатная консультация направлена на анализ
        Вашей ситуации и расчет стоимости услуг.
      </p>
      <label htmlFor="name" className={styles.label}>
        Как к Вам обращаться?
      </label>
      <input
        id="name"
        name="name"
        autocomplete="name"
        value={formData.name}
        onChange={handleChange}
        type="text"
        placeholder="Иван"
        className={styles.input}
      />
      <label htmlFor="phone" className={styles.label}>
        Телефон <span className="asterisk">*</span>
      </label>
      <input
        id="phone"
        name="phone"
        type="tel"
        autocomplete="tel"
        pattern="^(\+7|7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$"
        placeholder="+7(900)123-45-67 или 89001234567"
        value={formData.phone}
        onChange={handleChange}
        onBlur={validatePhone}
        style={{ borderColor: isValidPhone ? "initial" : "red" }} //окрашивает край в красный, только если телефон введен и введен некорректно
        required
        className={styles.input}
      />
      {!isValidPhone && (
        <small className={styles.small}>
          Введите корректный номер телефона
        </small>
      )}

      <label htmlFor="message" className={styles.label}>
        Сообщение
      </label>
      <textarea
        id="message"
        name="message"
        placeholder="Здесь Вы можете вкратце описать свою проблему или вопрос, а также оставить дополнительную информацию о связи с Вами"
        value={formData.message}
        onChange={handleChange}
        className={`${styles.input} ${styles.textarea}`}
      />
      <input
        id="order" //хани поттер и тайное поле
        type="text"
        name="order"
        onChange={handleChange}
        value={formData.order}
        className={`${styles.input} ${styles.order}`}
      ></input>
      <small className={styles.small}>
        <span className="asterisk">*</span>Поля, обязательные к заполнению
      </small>
      <small className={styles.small}>
        Нажимая кнопку, я подтверждаю, что ознакомлен(а) и принимаю условия
        <Link to="/privacy_policy" className={styles.link}>
          {" "}
          Политики Конфиденциальности
        </Link>{" "}
        и соглашаюсь на{" "}
        <Link to="/consent" className={styles.link}>
          обработку персональных данных
        </Link>
        .
      </small>
      <SmartCaptcha
        sitekey="<ключ_клиента>"
        onSuccess={setToken}
        key={resetCaptcha}
        test={true}
        language={"ru"}
        shieldPosition={"center-right"}
      />
      <button
        type="submit"
        name="submit"
        className={`${styles.button} buttonGen`}
      >
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
