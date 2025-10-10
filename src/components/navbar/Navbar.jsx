import './navbar.css';
import dataNavbar from '../../data/dataNavbar.json';
import { useState } from "react";  

export default function Navbar() {
  return (
    <header>
        <img src='/images/logo.svg'></img>
        <nav>
            {dataNavbar.map((item, index) => (
                <div className='navdiv'key={index}>
                    <a href={item.link}>
                        {item.name}
                    </a>
                    {index !== dataNavbar.length - 1 && (
                        <hr className="navhr"/>
                    )}
                </div>
            ))} 
        </nav>
        <div className='phoneAndWorkingHours'>
                <p>
                    пн-пт 9:00-18:00
                </p>
                <p>
                    +7(961)346-70-77
                </p>
            </div>
    </header>
    );
}