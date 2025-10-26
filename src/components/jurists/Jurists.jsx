import dataJurists from "../../data/dataJurists.json"
import { useState } from "react"
import './jurists.css'

export default function Jurists() {
    return(
    <div className="row carousel">
        {dataJurists.map((item => (<Staff picture={item.picture}
                                          name={item.name}
                                          description={item.description}
                                          key={item.id}/>)))}
    </div>
    )
}

function Staff(props){
    return(
        <div className="staffCard col">
            <img src={props.picture}></img>
            <h4>{props.name}</h4>
            <p>{props.description}</p>
        </div>
    )
}