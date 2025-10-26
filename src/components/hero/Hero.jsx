import './hero.css';
import FormPopup from '../form/FormPopup';

export default function Hero() {

  function showDialogForm(){
    return(
    <FormPopup />
    )
  }

  return(
    <div className='heroMain'>
      <button id='consultButton' onClick={showDialogForm}>БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ</button>
    </div>
  );
}
