import { useState } from "react";
import styles from "./legalFees.module.css";

export default function ServiceCard({ service }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className={styles.card}
      style={{
        backgroundImage:
          service.image && `url(${import.meta.env.BASE_URL}${service.image})`,
      }}
    >
      <div className={styles.backdrop}>
        <div
          className={`row ${styles.cardFront}`}
          onClick={() => {
            !showDescription
              ? setShowDescription(true)
              : setShowDescription(false);
          }}
        >
          <h3 className={styles.h3}>{service.name}</h3>
          <button
            name="Узнать больше"
            className={`${styles.button} ${showDescription && styles.buttonTransfrormed}`}
          >
            {"\u002B"}
          </button>
        </div>

        {/* Показывает описание */}
        <ul
          className={`${styles.description} ${showDescription ? styles.show : styles.hide}`}
        >
          {service.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
