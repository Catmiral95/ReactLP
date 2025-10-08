import './legalFees.css';
import feesList from '../../data/dataFees.json'

export default function LegalFees() {

  return(
      <section id='legalFees' className='col'>
        <h1>Услуги</h1>
        <img src='/images/diamondDecoration.svg'></img>
        <p>Мы оказываем полный спектр юридических услуг. <b>Консультация бесплатна.</b></p>
        <div className='listOfFees col'>
          {feesList.map((item, index) => (
          <div className="feediv" key={index}>
            <div className="col thumbnail">
              <img src={item.icon} alt={item.name}></img>
              <h3>{item.name}</h3>
              <button name="LearnMore" className='learnMoreFees'>Узнать больше</button>
            </div>
              <div className='description hidden'>
                <pre>{item.description}</pre>
                <img src='/images/closeSign.svg' />
              </div>
          </div>
        ))}
        </div>
      </section>
  );
}
