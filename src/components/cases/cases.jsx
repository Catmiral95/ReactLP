import "./cases.css";
import cases from "../../data/dataCases.json";
import { useState } from "react";

function CaseCard({ props, windowWidth }) {
  const [showFullCase, setShowFullCase] = useState(false);
  const [isShown, setIsShown] = useState(false);
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

  return (
    <div className="caseCard col">
      <div className="textCase col">
        <div className="container up">
          <div className="illustrationCase col">
            <img
              src={process.env.PUBLIC_URL + props.picture}
              alt={`Дело ${props.id}`}
              loading="lazy"
            />
            <h3>{`Дело ${props.id}`}</h3>
          </div>

          <div className="col text-preview-container">
            <h3>Суть происшествия</h3>
            <p>{props.text.case}</p>
            <br />
          </div>
        </div>

        <div className="container up">
          <div className="col">
            <h3>Пострадавшие</h3>
            <ul>
              {props.text.victim?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h3>Правовое основание иска</h3>
            <p>{props.text?.legalBasis}</p>
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
                  index !== props.text.tableData.length - 1 ? "tr-divider" : ""
                }`}
              >
                <td className="victim-td">{item[0]}</td>
                <td>
                  {item[1]?.map((penalty) => (
                    <ul>
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

        <div className="case-result col">
          <h3>Итог дела</h3>
          <p>{formatWithRegex(props.text.result)}</p>
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
      <h1 className="whiteText">Кейсы</h1>
      <br />
      <p className="whiteText">
        Лучшее доказательство профессионализма — реальные дела и судебные
        решения. В этом разделе вы можете ознакомиться с примерами дел из нашей
        практики, которые мы успешно закрыли. Изучите, как мы добивались:
        <ul style={{ marginLeft: "3rem" }} className="whiteText">
          <li className="whiteText">
            Защиты прав клиента при несоблюдении удовлетворения требований и
            нарушении сроков сдачи проекта
          </li>
          <li className="whiteText">Взыскания компенсации морального ущерба</li>
          <li className="whiteText">Поддержки при подачи аппеляции</li>
        </ul>
        Эти реальные истории показывают наш системный подход, глубокое знание
        законов и нацеленность на результат. Узнайте, как мы можем помочь в
        вашей ситуации.
      </p>
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
