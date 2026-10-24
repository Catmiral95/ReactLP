import "./cases.css";
import cases from "../../data/dataCases.json";
import { useState } from "react";
import CaseCard from "./CaseCard";
import { useWindowWidth } from "../../context/WindowWidth";

export default function Cases() {
  const [currentCaseId, setCurrentCaseId] = useState(4);
  const currentCase = cases.find((caseItem) => caseItem.id === currentCaseId);
  const windowWidth = useWindowWidth();

  const handleCaseClick = (id) => {
    setCurrentCaseId(id);
  };

  return (
    <section id="cases" className="col">
      <h1>Кейсы</h1>
      <br />
      <div className="textContainer">
        <p className="whiteText">
          Наилучшее доказательство профессионализма — реальные дела и судебные
          решения. В этом разделе вы можете ознакомиться с примерами дел из
          нашей практики, которые мы успешно закрыли. Изучите, как мы
          добивались:
        </p>
        <ul className="whiteText">
          <li className="whiteText">
            Защиты законных прав клиента при несоблюдении удовлетворения
            требований и нарушении сроков сдачи проекта;
          </li>
          <li className="whiteText">
            Полного взыскания справедливой компенсации за причинение морального
            ущерба;
          </li>
          <li className="whiteText">Поддержки при подаче апелляции.</li>
        </ul>

        <p className="whiteText">
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
