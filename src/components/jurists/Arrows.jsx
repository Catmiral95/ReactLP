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
  const changeSlideNext = () => {
    setRightSlideAnimation("");
    setAnimation("slide-left-out");
    setTimeout(() => {
      setIndex((prev) => (prev === props.length - 1 ? 0 : prev + 1));
      setAnimation("slide-left-in");
      setLeftSlideAnimation("fade-in");
    }, 300);
  };

  const changeSlidePrev = () => {
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
      <button className="arrowsButton" onClick={changeSlidePrev}>
        <img
          src={process.env.PUBLIC_URL + "/images/chevron.svg"}
          className="chevronPrev"
        />
      </button>
      <Dots dataJurists={dataJurists} currentSlides={currentSlides} />
      <button className="arrowsButton" onClick={changeSlideNext}>
        <img
          src={process.env.PUBLIC_URL + "/images/chevron.svg"}
          className="chevronNext"
        />
      </button>
    </div>
  );
}
