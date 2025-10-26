import './legalFees.css';
import feesList from '../../data/dataFees.json';
import { useState } from 'react';

// Компонент для отдельной карточки услуги
function ServiceCard({ service }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className='card'>
      {!showDescription ? (
        // Показывает название и картинку
        <div className="col card-front">
          <img src={service.icon} alt={service.name} style={service.cropStyle}/>
          <h3>{service.name}</h3>
          <button 
            name="LearnMore" 
            className='learnMoreFees'
            onClick={() => setShowDescription(true)}
          >
            Узнать больше
          </button>
        </div>
      ) : (
        // Показывает описание
        <div className='description'>
          <pre>{service.description}</pre>
          <button 
            className="closeCross"
            onClick={() => setShowDescription(false)}>
            <img src='/images/closeSign.svg' alt="Закрыть" />
          </button>
        </div>
      )}
    </div>
  );
}

// Основной компонент
export default function LegalFees() {
  return (
    <section id='legalFees' className='col'>
      <h1>Услуги</h1>
      <p>
        Мы оказываем полный спектр юридических услуг.
        <br />
        <b>Консультация бесплатна.</b>
      </p>
      <hr className="diamondhr"/>
      
      <div className="listOfFees col">
        {feesList.map(service => (<ServiceCard key={service.id} service={service} />))}
      </div>
    </section>
  );
}