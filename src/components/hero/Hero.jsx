import './hero.css';
import FormPopup from '../form/FormPopup';
import { useRef } from 'react';

export default function Hero() {
  const dialogForm = useRef(null);
  const openDialog = () => dialogForm.current.showModal();

  return(
    <div className='heroMain' id="heroPage">
      <button className='buttonGen contact-hero-button'
        onClick={openDialog}>
        Бесплатная консультация
      </button>
      <FormPopup ref={dialogForm}/>
    </div>
  );
}
