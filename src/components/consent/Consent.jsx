import "./Consent.css";
import { useState, useEffect } from 'react';


export default function Consent() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Проверяет localStorage при рендере компонента
    if (!localStorage.getItem('privacyPolicyAccepted')) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // обрабатывает клик вне окна консента
  const handleOutsideClick = (event) => {
    if (event.target.id === 'privacyModal') {
      setShowModal(false);
    }
  };

  if (!showModal) {
    return null; // Если модальное окно не должно отображаться, не рендерим ничего
  }

  return (
    <div id="privacyModal" className="cns-area" onClick={handleOutsideClick}>
      <div className="consent">
        <div className="consent-content">
          <p className="poltext">
            Вы используете сайт на условиях Соглашения об обработке персональных
            данных и Политики Конфиденциальности.
          </p>
          <div className="consent-buttons">
            <button id="acceptButton" onClick={handleAccept}>ОК</button>
            <button id="privpolicy" target="_blank" href="#">СОГЛАШЕНИЕ</button>
          </div>
        </div>
        <button className="closeCross cns-cross" onClick={handleClose}>
          <img src='/images/closeSign.svg' alt="Закрыть" />
        </button>
      </div>
    </div>
  );
}