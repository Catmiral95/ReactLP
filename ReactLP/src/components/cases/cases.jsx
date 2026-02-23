import "./cases.css";
import cases from "../../data/dataCases.json";
import { useState } from "react";

function CaseCard({ props, windowWidth }) {
  const [caseState, setCaseState] = useState("Читать далее");
  const isMobile = windowWidth <= 1200;

  const formatWithRegex = (text) => {
    const regex = /(\d+(?:[\s]\d+)*)₽/g;
    return text.split(regex).map((part, index) => {
      // Если часть соответствует числу (нечетные индексы в результате split)
      if (index % 2 === 1) {
        return <strong key={index}>{part}₽</strong>;
      }
      return part;
    });
  };

  const handleCaseClick = () => {
    if (caseState == "Читать далее") {
      setCaseState("Закрыть");
    } else {
      setCaseState("Читать далее");
    }
  };

  return (
    <div className="caseCard col">
      <div className="textCase col">
        <div className="container up preview-container">
          <div className="illustrationCase col">
            <img
              src={process.env.PUBLIC_URL + props.picture}
              alt={`Дело ${props.id}`}
              loading="lazy"
            />
            <h3>{`Дело ${props.id}`}</h3>
          </div>

          <div className="col text-preview-container col">
            <h3>Суть происшествия</h3>
            <p className="align-left-mobile">{props.text.case}</p>
            <br />
            <button
              type="button"
              className="read-more-btn buttonGen col"
              onClick={handleCaseClick}
            >
              {caseState}
            </button>
          </div>
        </div>

        <div
          className={`more-details-container ${caseState == "Читать далее" ? "hidden" : ""}`}
        >
          <div className="container up">
            <div className="col">
              <h3>Пострадавшие</h3>
              <ul>
                {props.text.victim?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {isMobile && <br />}
            <div className="col">
              <h3>Правовое основание иска</h3>
              <p className="align-left-mobile">{props.text?.legalBasis}</p>
            </div>
          </div>

          <br />

          <div className="col">
            <h3>Решение суда</h3>
            <p>{props.text?.courtDecision}</p>
            <br />
            <table>
              {props.text.tableData?.map((item, index) => (
                <tr
                  key={item[0]}
                  className={`${
                    index !== props.text.tableData.length - 1
                      ? "tr-divider"
                      : ""
                  }`}
                >
                  <td className="victim-td">{item[0]}</td>
                  <td>
                    {item[1]?.map((penalty) => (
                      <ul style={{ listStyleType: "none" }}>
                        <li className="no-marker">
                          <tr className={isMobile && "col"}>
                            <td className="penalty-sum">
                              {formatWithRegex(penalty[0])}
                            </td>
                            <td className="penalty-fine">{penalty[1]}</td>
                          </tr>
                        </li>
                      </ul>
                    ))}
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <br />
          <div className="case-result col">
            <h3>Итог дела</h3>
            <p>{formatWithRegex(props.text.result)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

//основной компонент
export default function Cases({ windowWidth }) {
  const [currentCaseId, setCurrentCaseId] = useState(4);
  const currentCase = cases.find((caseItem) => caseItem.id === currentCaseId);

  const handleCaseClick = (id) => {
    setCurrentCaseId(id);
  };

  return (
    <section id="cases" className="col">
      <h1>Кейсы</h1>
      <br />
      <div className="textContainer">
        <p className="whiteText align-left-mobile">
          Самое лучшее доказательство нашего профессионализма — реальные дела и
          судебные решения. В этом разделе вы можете ознакомиться с примерами
          дел из нашей практики, которые мы успешно закрыли. Изучите, как мы
          добивались:
          <ul>
            <li>
              Защиты прав клиента при несоблюдении удовлетворения требований и
              нарушении сроков сдачи проекта
            </li>
            <li>Взыскания компенсации морального ущерба</li>
            <li>Поддержки при подачи аппеляции</li>
          </ul>
          Эти реальные истории показывают наш системный подход, глубокое знание
          законов и нацеленность на результат. Узнайте, как мы можем помочь в
          вашей ситуации.
        </p>
      </div>
      <br />
      <div className="case-pile col">
        <div className="buttons-container row">
          {cases.map((caseItem) => (
            <button
              key={caseItem.id}
              className="case-num-btn"
              onClick={() => handleCaseClick(caseItem.id)}
            >
              #{caseItem.id}
            </button>
          ))}
        </div>
        {currentCase && (
          <CaseCard props={currentCase} windowWidth={windowWidth} />
        )}
      </div>
    </section>
  );
}
