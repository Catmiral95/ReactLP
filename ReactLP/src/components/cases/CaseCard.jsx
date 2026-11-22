import "./cases.css";
import { useState } from "react";
import { useWindowWidth } from "../../context/WindowWidth";

export default function CaseCard({ image, id, text }) {
  const [caseState, setCaseState] = useState("Читать далее");
  const isMobile = useWindowWidth() <= 1200;

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
    if (caseState === "Читать далее") {
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
              src={`${import.meta.env.BASE_URL}${image}`}
              alt={`Дело ${id}`}
              loading="lazy"
            />
            <h3>{`Дело ${id}`}</h3>
          </div>

          <div className="col text-preview-container col">
            <h3>Суть происшествия</h3>
            <p className="crux">{text.case}</p>
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
          className={`more-details-container ${caseState === "Читать далее" ? "hidden" : "details_shown"}`}
        >
          <div className="container up">
            <div className="col">
              <h3>Пострадавшие</h3>
              <ul>
                {text.victim?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {isMobile && <br />}
            <div className="col">
              <h3>Правовое основание иска</h3>
              <p className="align-left-mobile">{text?.legalBasis}</p>
            </div>
          </div>

          <br />

          <div className="col">
            <h3>Решение суда</h3>
            <p>{text?.courtDecision}</p>
            <br />
            <table>
              {text.tableData?.map((item, index) => (
                <tr
                  key={item[0]}
                  className={`${
                    index !== text.tableData.length - 1 ? "tr-divider" : ""
                  }`}
                >
                  <td className="victim-td">
                    <b>{item[0]}</b>
                  </td>
                  <td>
                    {item[1]?.map((penalty) => (
                      <ul style={{ listStyleType: "none" }} key={penalty}>
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
            <p>{formatWithRegex(text.result)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
