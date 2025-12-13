import dataJurists from "../../data/dataJurists.json";
import "./juristsCard.css";
import { useEffect, useState } from "react";
import Arrows from "./Arrows";

export default function Jurists() {
  const [index, setIndex] = useState(0);
  const [animation, setAnimation] = useState("");
  const [rightSlideAnimation, setRightSlideAnimation] = useState("");
  const [leftSlideAnimation, setLeftSlideAnimation] = useState("");

  const test = window.matchMedia("(max-width: 1400px)").matches ? true : false;
  const currentSlides = test
    ? [dataJurists[index]]
    : [
        dataJurists[index],
        dataJurists[(index + 1) % dataJurists.length],
        dataJurists[(index + 2) % dataJurists.length],
      ];

  return (
    <div className="col" style={{ position: "relative" }}>
      <Arrows
        props={dataJurists}
        currentIndex={index}
        setIndex={setIndex}
        setAnimation={setAnimation}
        setRightSlideAnimation={setRightSlideAnimation}
        setLeftSlideAnimation={setLeftSlideAnimation}
        dataJurists={dataJurists}
        currentSlides={currentSlides}
      />
      <br />
      <div className={`row slider ${animation} `}>
        {currentSlides.map((item) => (
          <Staff
            picture={item.picture}
            name={item.name}
            description={item.description}
            key={item.id}
            isFirst={currentSlides[0].id === item.id}
            isLast={currentSlides[currentSlides.length - 1].id === item.id}
            rightSlideAnimation={rightSlideAnimation}
            leftSlideAnimation={leftSlideAnimation}
          />
        ))}
      </div>
    </div>
  );
}

function Staff(props) {
  return (
    <div
      className={`staffCard col 
                            ${props.isFirst && "first-slide"}
                            ${props.isLast && "last-slide"}
                            ${props.isFirst ? props.rightSlideAnimation : ""}
                            ${props.isLast ? props.leftSlideAnimation : ""}`}
    >
      <img
        src={process.env.PUBLIC_URL + props.picture}
        alt={props.name}
        load="lazy"
      ></img>
      <h4>{props.name}</h4>
      <p>{props.description}</p>
    </div>
  );
}
