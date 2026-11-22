import SwipeComponent from "../../hooks/swipeHook";
import chevron from "../../assets/images/chevron.svg";
import styles from "./arrows.module.css";

export default function Arrows({
  props,
  setIndex,
  setAnimation,
  setRightSlideAnimation,
  setLeftSlideAnimation,
}) {
  const slideNext = () => {
    setRightSlideAnimation("");
    setAnimation(styles.slideLeftOut);
    setTimeout(() => {
      setIndex((prev) => (prev === props.length - 1 ? 0 : prev + 1));
      setAnimation(styles.slideLeftIn);
      setLeftSlideAnimation(styles.fadeIn);
    }, 300);
  };

  const slidePrev = () => {
    setLeftSlideAnimation("");
    setAnimation(styles.slideRightOut);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? props.length - 1 : prev - 1));
      setAnimation(styles.slideRightIn);
      setRightSlideAnimation(styles.fadeIn);
    }, 300);
  };

  return (
    <div className="row">
      <div className={styles.chevronLeftContainer}></div>

      <div className={`${styles.arrowsContainer} row`}>
        <img
          role="button"
          alt="предыдущий"
          id="arrowPrev"
          src={chevron}
          className={`${styles.chevronPrev} ${styles.arrowsButton}`}
          onClick={slidePrev}
        />
        <img
          role="button"
          alt="следующий"
          id="arrowNext"
          src={chevron}
          className={`${styles.chevronNext} ${styles.arrowsButton}`}
          onClick={slideNext}
        />
      </div>

      <SwipeComponent
        className={`${styles.chevronLeftContainer} col`}
        onSwipeRight={slideNext}
      ></SwipeComponent>

      <div className={styles.chevronRightContainer}></div>

      <SwipeComponent
        className={`${styles.chevronRightContainer} col`}
        onSwipeLeft={slidePrev}
      ></SwipeComponent>
    </div>
  );
}
