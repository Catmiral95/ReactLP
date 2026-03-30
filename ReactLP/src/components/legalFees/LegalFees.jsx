import "./legalFees.css";
import feesList from "../../data/dataFees.json";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";

// Компонент для отдельной карточки услуги
function ServiceCard({ service }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="card-wrapper"
      style={{
        backgroundImage: service.image
          ? `url(${process.env.PUBLIC_URL + service.image})`
          : "none",
      }}
    >
      <div className="card col">
        <div
          className="row card-front"
          onClick={() => {
            !showDescription
              ? setShowDescription(true)
              : setShowDescription(false);
          }}
        >
          <h3>{service.name}</h3>
          <button
            name="LearnMore"
            className={
              !showDescription ? "learnMoreFees" : "learnMoreFeesTransformed"
            }
          >
            {"\u002B"}
          </button>
        </div>

        {/* Показывает описание */}
        <div className={`description ${showDescription ? "show" : "hide"}`}>
          <ul>
            {service.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Основной компонент
export default function LegalFees() {
  return (
    <section id="legalFees" className="col">
      <h1>Услуги</h1>
      <p>
        Мы оказываем полный спектр юридических услуг. Ниже представлены ведущие
        направления нашей деятельности.
        <b> Консультация бесплатна.</b>
        <p>
          Если вас интересуют вопросы или услуги, не представленные в указанном
          списке,{" "}
          <b>
            <HashLink to="#contacts" className="consult_link">
              напишите нам для консультации
            </HashLink>
            .
          </b>
        </p>
      </p>

      {
        <div className="listOfFees col">
          {feesList.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      }
      <br />

      <br />
    </section>
  );
}
