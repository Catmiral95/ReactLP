import './dots.css'

export default function Dots({dataJurists, currentSlides}){

   const checkActivity = (id) => {
       return currentSlides.some(slide => slide.id === id);
  };

    return(
    <div className="row">
        {dataJurists.map((item) => (<OneDot key={item.id} id={item.id} isActive={checkActivity(item.id)}/>))}
    </div>)
}

export function OneDot({ id, isActive }) {
  return (
    <div
      className={`${isActive ? "activeDot" : "inactiveDot"} dot`}
      id={id}
    ></div>
  );
}