import "./contacts.css";
import { useState } from "react";


export default function Contacts(){
    return(
    <section id="contacts">
        <h1>Контакты</h1>
        <div className="container" id="contactsContainer">
                <div className="info col">
                    <div className="row">
                        {/*Тут должна будет быть карта яндекса*/}
                        <img src="/images/address.svg" alt="адрес"/>
                        <p style={{display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                        }}>428003, Чувашская Республика, <br/> г. Чебоксары, ул. Афанасьева, д. 2, оф. 56.</p>
                    </div>
                    <div className="row">
                        <img src="/images/workingHours.svg" alt="часы работы"/>
                        <p>пн-пт 9:00-18:00</p>
                    </div>
                    <div className="row">
                        <img src="/images/phone.svg" alt="телефон"/>
                        <p>+7(961)346-70-77</p>
                    </div>
                    <div className='row'>
                        <img src="/images/mail.svg"/>
                        <p>liderprava21@ya.ru</p>
                    </div>
                    <div className="row">
                        <img src="/images/owner.svg" alt="владелец"/>
                        <p>ИП Артемьев Артём Сергеевич</p>
                    </div>
                <div className="readFeedback row">
                    <p>Читайте отзывы о нас: </p>
                    <a href="https://yandex.ru/maps/org/lider_prava/34845163518/reviews/?ll=50.123226%2C55.641204&z=7">
                        <img src="/images/yandex.svg" alt="Яндекс отзывы"/>
                    </a>
                    <a href="https://2gis.ru/cheboksary/firm/70000001053905641/tab/reviews">
                        <img src="/images/2gis.svg" alt="2gis отзывы"/>
                    </a>
                </div>
            </div>

            <div className="col formDiv">
                <h2>Связаться с нами</h2>
                <br />
                <p>Заполните форму, чтобы записаться на бесплатную консультацию или задать вопрос.</p>
                <hr className="diamondhr" style={{"margin-top":"0px"}}/>
                <Form />
            </div>
        </div>
    </section>)
}

export function Form(){
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [submitAnimation, setSubmitAnimation] = useState({});

  const animateSubmit = () => {
    setSubmitAnimation({
      animation: ' fly 0.6s ease-in forwards',
      pointerEvents: 'none'
    }
    ); 
    setTimeout(() => {
    setSubmitAnimation({});
  }, 600);
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
        animateSubmit();
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
              type="tel"
              pattern="+[7]{1}\([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}"
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
              onChange={handleChange}>
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

            <button type="submit" 
                    name="submit" 
                    className="buttonGen submitButton"
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
              <span style={submitAnimation}>ОТПРАВИТЬ</span>
            </button>
            <p>{status}</p>
            <small>
              Нажимая кнопку, я подтверждаю, 
              что ознакомлен(а) и принимаю условия 
              <a href="#" style={{color: "royalblue"}}>Политики Конфиденциальности</a> и соглашаюсь 
              на <a href='#' style={{color: "royalblue"}}>обработку персональных данных</a>.
              </small>
          </form>
  )
}
