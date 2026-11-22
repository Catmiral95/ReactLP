import "./additionalPages.module.css";
import styles from "./notFound.module.css";

export default function NotFoundScreen() {
  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.h1}>404</h1>
        <hr className={styles.hr} />
        <p className={styles.p}>
          Такой страницы не существует. Проверьте адрес или воспользуйтесь
          навигацией по сайту
        </p>
      </section>
    </>
  );
}
