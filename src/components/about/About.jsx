import "./about.css";
import Jurists from "../jurists/Jurists";

export default function About({ windowWidth }) {
  const isMobile = windowWidth <= 1200;
  const advantages = [
    {
      image: "/images/yearsOfExperience.svg",
      plaintText: "опыта",
      boldText: "7 лет",
      id: "div1",
    },
    {
      image: "/images/individualApproach.svg",
      plaintText: "подход",
      boldText: "Индивидуальный",
      id: "div2",
    },
    {
      image: "/images/flexibilityAndKindness.svg",
      plaintText: "отзывчивость",
      boldText: "Гибкость",
      id: "div3",
    },
    {
      image: "/images/allAroundCountry.svg",
      plaintText: "Работаем",
      boldText: "по всей стране",
      id: "div4",
    },
    {
      image: "/images/pricePolicy.svg",
      plaintText: "ценовая политика",
      boldText: "Лояльная",
      id: "div5",
    },
  ];

  return (
    <section id="about">
      <div className="bg-and-info row">
        <div className="col about-info-container">
          <h1>О нас</h1>
          <br />
          <p>
            Вот уже несколько лет мы предоставляем юридические услуги по всей
            России. Мы специализируемся на автоинцидентах, банкротстве,
            трудовых, страховых спорах и т.д. Наши принципы — честность,
            прозрачность и индивидуальный подход к каждому клиенту. Гарантируем
            защиту ваших интересов и достижение результата.
          </p>
          <br />
          <div className="advantages-container">
            {advantages.map((item) => (
              <div
                className={`advantage row ${
                  item.id[item.id.length - 1] % 2 == 0
                    ? "to-the-right"
                    : "to-the-left"
                } ${item.id}`}
                key={item.id}
              >
                <img
                  alt={item.name}
                  src={process.env.PUBLIC_URL + item.image}
                />
                {item.id != "div4" ? (
                  <p className="col">
                    <strong>{item.boldText}</strong>
                    {item.plaintText}
                  </p>
                ) : (
                  <p className="col">
                    {item.plaintText}
                    <strong>{item.boldText}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {!isMobile && (
          <div className="carousel row">
            <div className="row carousel-inside">
              <div className="slide slide-1"></div>
              <div className="slide slide-2"></div>
              <div className="slide slide-3"></div>
            </div>
            <div className="row carousel-inside" aria-hidden>
              <div className="slide slide-1"></div>
              <div className="slide slide-2"></div>
              <div className="slide slide-3"></div>
            </div>
          </div>
        )}
      </div>

      <div className="col about-jurists-container">
        <h2>Наши юристы</h2>
        <p>Наши опытные юристы готовы ответить на все ваши вопросы.</p>
        <br />
        <Jurists />
        <br />
      </div>
    </section>
  );
}
