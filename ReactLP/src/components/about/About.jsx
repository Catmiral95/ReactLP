import styles from "./about.module.css";
import Jurists from "../jurists/Jurists";
import { useWindowWidth } from "../../context/WindowWidth";
import advantages from "../../data/dataAdvantages.json";

export default function About() {
  const isMobile = useWindowWidth() <= 1200;
  return (
    <section id="about" className={styles.section}>
      <div className="row">
        <div className="col">
          <h1 className={styles.h1}>О нас</h1>
          <br />
          <p className={styles.p}>
            Мы - юристы из города Чебоксары. И вот уже несколько лет мы
            предоставляем услуги не только в городе, но и по всей стране.
            Специализируемся на автоинцидентах, трудовых, страховых и иных
            спорах, а также предоставляем полное юридическое сопровождение
            Вашего бизнеса под ключ. Принципы нашей компании — честность,
            прозрачность и индивидуальный подход к каждому. Находим эффективные
            решения в самых сложных ситуациях.
          </p>
          <br />
          <div className={styles.advantages}>
            {advantages.map((item) => (
              <div
                className={`${styles.advantage} row ${
                  item.id[item.id.length - 1] % 2 === 0
                    ? styles.right
                    : styles.left
                } ${item.id}`}
                key={item.id}
              >
                <img
                  alt={item.name}
                  src={`${import.meta.env.BASE_URL}${item.image}`}
                  className="border-2 border-solid border-white"
                />
                {item.id !== "div4" ? (
                  <p className="col">
                    <strong>{item.boldText}</strong>
                    {item.plaintText}
                  </p>
                ) : (
                  <p className="col">
                    {item.plaintText}
                    <strong>{item.boldText}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {!isMobile && (
          <div className={`row ${styles.carousel}`}>
            <div className="row">
              <div className={`${styles.slide} ${styles.slide1}`}></div>
              <div className={`${styles.slide} ${styles.slide2}`}></div>
              <div className={`${styles.slide} ${styles.slide3}`}></div>
            </div>
            <div className="row" aria-hidden>
              <div className={`${styles.slide} ${styles.slide1}`}></div>
              <div className={`${styles.slide} ${styles.slide2}`}></div>
              <div className={`${styles.slide} ${styles.slide3}`}></div>
            </div>
          </div>
        )}
      </div>

      <div className="col">
        <h2 className={styles.h2}>Наша команда</h2>
        <p className={styles.p}>
          Опытные юристы готовы ответить на все ваши вопросы.
        </p>
        <br />
        <Jurists />
        <br />
      </div>
    </section>
  );
}
