import "./contacts.css";
import { useWindowWidth } from "../../context/WindowWidth";
import Form from "../form/Form.jsx";
import address from "../../assets/images/address.svg";
import workingHours from "../../assets/images/workingHours.svg";
import phone from "../../assets/images/phone.svg";
import mail from "../../assets/images/mail.svg";
import owner from "../../assets/images/owner.svg";
import yandex from "../../assets/images/yandex.svg";
import twoGis from "../../assets/images/2gis.svg";

export default function Contacts() {
  const isMobile = useWindowWidth() <= 1200;
  return (
    <section id="contacts" className="col">
      <h1>Контакты</h1>
      <p style={{ textIndent: "0" }}>
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
              title="Расположение адреса на карте"
            ></iframe>
          ) : (
            <iframe
              src="https://yandex.ru/map-widget/v1/org/lider_prava/34845163518/?from=mapframe&ll=47.260332%2C56.145045&z=13.84"
              frameborder="1"
              width="250"
              height="250"
              allowfullscreen="false"
              style={{ position: "relative", width: "90%" }}
              title="Расположение адреса на карте"
            ></iframe>
          )}

          <br />

          <div
            className="col"
            style={{ alignItems: "flex-start", gap: "0.1lh" }}
          >
            <div className="row">
              <img src={address} alt="адрес" />
              <p
                style={{
                  alignItems: "flex-start",
                  textIndent: "0",
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
              <img src={workingHours} alt="часы работы" />
              <p className="workhours" style={{ textIndent: "0" }}>
                пн-пт 9:00-18:00
              </p>
            </div>
            <div className="row phone-info">
              <img src={phone} alt="телефон" />
              <a
                href="tel:+79603128406"
                style={{ textDecoration: "none" }}
                title="Телефон для связи"
                className="tel"
              >
                +7(960)312-84-06
              </a>
            </div>
            <div className="row mail-info">
              <img src={mail} alt="почта" />
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
              <img src={owner} alt="владелец" />
              <a
                href="https://www.rusprofile.ru/ip/319213000057662"
                className="artyom"
              >
                ИП Артемьев Артём Сергеевич
              </a>
            </div>
          </div>
          <br />

          <div className="readFeedback row">
            <p>Читайте отзывы о нас: </p>
            <a
              href="https://yandex.ru/maps/org/lider_prava/34845163518/reviews/?ll=50.123226%2C55.641204&z=7"
              title="Отзывы на Яндексе"
            >
              <img src={yandex} alt="Яндекс отзывы" />
            </a>
            <a
              href="https://2gis.ru/cheboksary/firm/70000001053905641/tab/reviews"
              title="Отзывы на 2гис"
            >
              <img src={twoGis} alt="2gis отзывы" />
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
