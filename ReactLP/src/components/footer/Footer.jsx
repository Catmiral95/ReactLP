import "./footer.css";
import dataNavbar from "../../data/dataNavbar.json";

export default function Footer() {
  return (
    <footer>
      <h3>
        ЛИДЕР <span>ПРАВА</span>
      </h3>
      <div className="footerContainer">
        <hr />
        <nav>
          {dataNavbar.map((item, index) => (
            <div key={index}>
              <a href={item.link}>{item.name}</a>
            </div>
          ))}
        </nav>
        <hr />
        <div className="col footerDiv">
          <span>Связаться с нами: </span>
          <div className="row">
            <img
              src={process.env.PUBLIC_URL + "/images/addressW.svg"}
              alt="адрес"
            />
            <p>
              428003, Чувашская Республика, <br />
              г. Чебоксары, ул. Афанасьева, д. 2, оф. 56.
            </p>
          </div>
          <div className="row">
            <img
              src={process.env.PUBLIC_URL + "/images/phoneW.svg"}
              alt="телефон"
            />
            <a
              href="tel:+79613467077"
              style={{ textDecoration: "none" }}
              title="Телефон для связи"
            >
              +7(961)346-70-77
            </a>
          </div>
          <div className="row">
            <img
              src={process.env.PUBLIC_URL + "/images/mailW.svg"}
              alt="почта"
            />
            <a href="mailto:mailto:liderprava@ya.ru" title="Почта для связи">
              liderprava21@ya.ru
            </a>
          </div>
          <div className="row" style={{ marginTop: "1rem" }}>
            <a href="https://t.me/liderpravacheb" title="Телеграм">
              <img
                src={process.env.PUBLIC_URL + "/images/tgW.svg"}
                alt="телеграм"
              />
            </a>
            <a href="https://vk.com/liderprava21" title="ВКонтакте">
              <img
                src={process.env.PUBLIC_URL + "/images/vkW.svg"}
                alt="ВКонтакте"
              />
            </a>
            {/*Раскомментить в лучшие времена */}
            {/*<a
              href="https://api.whatsapp.com/send/?phone=79603128406&amp;text=Здравствуйте%21%0A%0AПишу+из+приложения+2ГИС.%0A%0A&amp;type=phone_number&amp;app_absent=0"
              title="WhatsApp"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/whatsappW.svg"}
                alt="WhatsApp"
              />
            </a>*/}
          </div>
        </div>
        <hr />
        <div className="col feedback-footer">
          <span>Читайте отзывы о нас: </span>
          <div className="row" style={{ marginTop: "1rem" }}>
            <a
              href="https://yandex.ru/maps/org/lider_prava/34845163518/reviews/?ll=50.123226%2C55.641204&z=7"
              title="Отзывы на Яндексе"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/yandexW.svg"}
                alt="яндекс отзывы"
              />
            </a>
            <a
              href="https://2gis.ru/cheboksary/firm/70000001053905641/tab/reviews"
              title="Отзывы на 2гис"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/2gisW.svg"}
                alt="2gis отзывы"
              />
            </a>
          </div>
        </div>
        <hr />
        <div className="col footerDiv">
          <a href="#" title="Соглашение об обработке данных">
            Соглашение об обработке данных
          </a>
          <a href="#" title="Политика конфиденциальности">
            Политика конфиденциальности
          </a>
        </div>
        <hr />
      </div>
      <p className="url">LIDER-PRAVA.RU</p>
    </footer>
  );
}
