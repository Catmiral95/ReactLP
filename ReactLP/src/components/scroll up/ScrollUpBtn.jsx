import styles from "./scroll_button.module.css";

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
      <img src={process.env.PUBLIC_URL + "/images/arrow.svg"} alt="наверх" />
    </button>
  );
}
