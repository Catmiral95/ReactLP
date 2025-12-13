import "./hero.css";
import FormPopup from "../form/FormPopup";
import { useRef } from "react";

export default function Hero({ windowWidth }) {
  const dialogForm = useRef(null);
  const openDialog = () => dialogForm.current.showModal();
  const isMobile = windowWidth <= 1200;

  const contanctsHero = [
    {
      image: "/images/mailW.svg",
      link: "mailto:liderprava@ya.ru",
      name: "почта",
    },
    {
      image: "/images/phoneW.svg",
      link: "tel:+7 961 346 70 77",
      name: "телефон",
    },
    {
      image: "/images/whatsappW.svg",
      link: "https://api.whatsapp.com/send/?phone=79603128406&amp;text=Здравствуйте%21%0A%0AПишу+из+приложения+2ГИС.%0A%0A&amp;type=phone_number&amp;app_absent=0",
      name: "WhatsApp",
    },
    {
      image: "/images/vkW.svg",
      link: "https://vk.com/liderprava21",
      name: "вконтакте",
    },
    {
      image: "/images/tgW.svg",
      link: "https://t.me/liderpravacheb",
      name: "телеграм",
    },
  ];

  return (
    <div className="hero col" id="heroPage">
      <div className="hero-content col">
        <div className="col title-container">
          <h1 className="title">Лидер права</h1>
          <h2 className="undertitle">юридическая компания</h2>
        </div>
        <br />
        <q className="cath-phrase">
          Qui jure suo utĭtur, nemĭni facit injuriam.
        </q>
        <br />
        <button
          className="buttonGen contact-hero-button row"
          onClick={openDialog}
        >
          <p>Бесплатная консультация</p>
          <img src={process.env.PUBLIC_URL + "/images/arrow.svg"} alt="arrow" />
        </button>
        <div className="row icons-container">
          {contanctsHero.map((item) => (
            <a href={item.link} key={item.name}>
              <img
                className="icon"
                src={process.env.PUBLIC_URL + item.image}
                alt={item.name}
              />
            </a>
          ))}
        </div>
      </div>
      <FormPopup ref={dialogForm} />
    </div>
  );
}
