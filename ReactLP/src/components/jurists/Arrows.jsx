import "./arrows.css";
import Dots from "./Dots";

export default function Arrows({
  props,
  setIndex,
  setAnimation,
  setRightSlideAnimation,
  setLeftSlideAnimation,
  dataJurists,
  currentSlides,
}) {
  const slideNext = () => {
    setRightSlideAnimation("");
    setAnimation("slide-left-out");
    setTimeout(() => {
      setIndex((prev) => (prev === props.length - 1 ? 0 : prev + 1));
      setAnimation("slide-left-in");
      setLeftSlideAnimation("fade-in");
    }, 300);
  };
  const slidePrev = () => {
    setLeftSlideAnimation("");
    setAnimation("slide-right-out");
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? props.length - 1 : prev - 1));
      setAnimation("slide-right-in");
      setRightSlideAnimation("fade-in");
    }, 300);
  };

  return (
    <div className="row chevronContainer">
      <img
        role="button"
        alt="предыдущий"
        id="arrowPrev"
        src={process.env.PUBLIC_URL + "/images/chevron.svg"}
        className="chevronPrev arrowsButton"
        onClick={slidePrev}
      />

      <Dots dataJurists={dataJurists} currentSlides={currentSlides} />

      <img
        role="button"
        alt="следующий"
        id="arrowNext"
        src={process.env.PUBLIC_URL + "/images/chevron.svg"}
        className="chevronNext arrowsButton"
        onClick={slideNext}
      />
    </div>
  );
}
