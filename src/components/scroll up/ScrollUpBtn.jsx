import "./scroll_button.css";

export default function ScrollUp() {
  const scrollToTop = function () {
    // Scroll to top logic
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className="scroll-btn" onClick={scrollToTop}>
      <img src={process.env.PUBLIC_URL + "/images/arrow.svg"} alt="наверх" />
    </button>
  );
}
