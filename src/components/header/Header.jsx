import { useState } from 'react'
import './header_and_navbar.css'
import Navbar from './Navbar'

export default function Header(){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    return(
    <header className='container'>
        <a href="#" 
           style={{textDecoration:'none'}}
           className={`${windowWidth <= 1000 ? "visible" : "hidden"}`}>
            ☰
        </a>
        <div className={`${windowWidth <= 1200 ? "visible" : "hidden"} row`} style={{flexGrow:'0.5', justifyContent: 'space-around'}}>
            <Navbar />
            <div className='hours-and-phone-container col'  style={{flexGrow:'0.1'}}>
                <p id="working-hours">
                    пн-пт 9:00 - 18: 00
                </p>
                <p><a hreaf='tel +7(961)346-70-77'></a>+7(961)346-70-77</p>
            </div>
        </div>
    </header>
    )
}