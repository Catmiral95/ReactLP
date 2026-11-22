import styles from "./legalFees.module.css";
import feesList from "../../data/dataFees.json";
import ServiceCard from "./ServiceCard";
import { HashLink } from "react-router-hash-link";

// Основной компонент
export default function LegalFees() {
  return (
    <section id="legalFees" className={`col ${styles.section}`}>
      <h1>Услуги</h1>
      <p>
        Оказываем полный спектр юридических услуг и готовы подробно рассмотреть
        каждую ситуацию. Чуть ниже представлены основные направления нашей
        деятельности.
        <b> Консультация бесплатна.</b>
      </p>
      <p>
        Если вас интересуют вопросы или услуги, не представленные в указанном
        списке,{" "}
        <b>
          <HashLink to="#contacts" className={styles.link}>
            вы можете написать нам для консультации
          </HashLink>
          .
        </b>
      </p>

      {
        <ul className={`col ${styles.ul}`}>
          {feesList.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      }
      <br />

      <br />
    </section>
  );
}
