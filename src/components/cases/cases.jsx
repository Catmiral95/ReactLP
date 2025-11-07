import "./cases.css";
import cases from "../../data/dataCases.json";
import {useState} from 'react';

function CaseCard({ props }){
  const [showFullCase, setShowFullCase] = useState(false);

  function textCut(str){
    return str.slice(0, 501) + `...`
  }

  return(
    <div className="caseCard container">

      <div className='illustrationCase col'>
        <img src={props.picture} alt={`Дело ${props.id}`}/>
        <h4>{`Дело ${props.id}`}</h4>
      </div>

      {!showFullCase ? 
      ( 
        //показывает только половину текста
        <div className="textCase col">
          <p>{textCut(props.text.case)}</p>
          <button
            name='read_more'
            className="learnMoreCases"
            onClick={() => setShowFullCase(true)}>
              Читать дальше
            </button>
          </div>

      ):( 
        //показывает текст кейса полностью
        <div className="textCase col">
          <p>{props.text.case}</p>
          <br/>
          <p>{props.text.result}</p>
          <button className="buttonGen" onClick={() => setShowFullCase(false)}>скрыть</button>
        </div>
      )}
    </div>
  )
}

//основной компонент
export default function Cases() {
  return(
    <section id="cases">
      <h1>Кейсы</h1>
      <p>Дела, которые мы вели и успешно закрыли. Реальные примеры из нашей практики.</p>
      <hr className="diamondhr"/>
      <div className="casesList col">
        {cases.map(props => (<CaseCard key={props.id} props={props} />))}
      </div>
    </section>
  );
}