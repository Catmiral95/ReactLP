import "./Consent.css";

import React, { useState, useEffect } from 'react';


const Consent  = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Проверяем localStorage при монтировании компонента
    if (!localStorage.getItem('privacyPolicyAccepted')) {
      setShowModal(true);
    }
  }, []); // Пустой массив зависимостей означает, что эффект запустится один раз при монтировании

  const handleAccept = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // Обработчик клика вне модального окна
  const handleOutsideClick = (event) => {
    if (event.target.id === 'privacyModal') { // Проверяем, что клик был именно по фону модального окна
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
            <button className="cns-btn-1" id="acceptButton" onClick={handleAccept}>ОК</button>
            <button className="cns-btn-2" id="privpolicy" target="_blank" href="">СОГЛАШЕНИЕ</button>
          </div>
        </div>
        <img className="cns-cross" onClick={handleClose} src="public/images/closeSign.svg"/>
      </div>
    </div>
  );
}

export default Consent;