import Carousel from "../jurists/Jurists.jsx"
import './about.css'

export default function About() {
  return (
  <>
    <h1>О нас</h1>
    <hr className="diamondhr"/>
      <img id="groupPhoto" src="/images/LiderPravaPhotos/groupPhoto.png"/>
      <hr className="diamondhr" style={{"margin-top": "0.5lh"}}/>
    <p>Вот уже несколько лет мы предоставляем юридические услуги по всей России. 
      Мы специализируемся на автоинцидентах, банкротстве, трудовых, страховых спорах и т.д. Наши принципы — честность, прозрачность и индивидуальный подход к каждому клиенту.
      Гарантируем защиту ваших интересов и достижение результата.</p>
    <h2>Наши юристы</h2>
    <p>Наши опытные юристы готовы ответить на все ваши вопросы.</p>
    <hr className="diamondhr" style={{"margin-top": "0.5lh"}}/>
  </>);
}
