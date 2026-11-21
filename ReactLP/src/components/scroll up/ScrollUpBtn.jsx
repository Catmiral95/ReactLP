import styles from "./scroll_button.module.css";
import arrow from "../../assets/images/arrow.svg";

export default function ScrollUp() {
  const scrollToTop = function () {
    // Scroll to top logic
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className={styles.button} onClick={scrollToTop}>
      <img src={arrow} alt="наверх" />
    </button>
  );
}
