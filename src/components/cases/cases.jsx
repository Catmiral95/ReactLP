import "./cases.css";
import cases from "../../data/dataCases.json";

export default function Cases() {
  return(
    <section id="#cases">
      <h1>Кейсы</h1>
      <p>Дела, которые мы вели и успешно закрыли. Реальные примеры из нашей практики.</p>
      <img src="/images/diamondDecoration.svg" alt="diamond divider"/>
      {cases.map((item, index) => (
        <div className="caseDiv">
            <img src={item.picture} alt={item.name}></img>
            <div className="caseName">{item.name}</div>
            <p>{item.text.case}</p>
            <button name="Read more"  className="learnMoreCases">Читать далее</button>
        </div>
      ))}
    </section>
  );
}