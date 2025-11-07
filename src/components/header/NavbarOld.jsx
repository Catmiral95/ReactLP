import './navbar.css';
import dataNavbar from '../../data/dataNavbar.json';
import { useEffect } from "react";  

export default function Navbar() { //изменяет вид навбара при скролле
    useEffect(() => {
            function handleScroll(e) {
                const windowTop = window.scrollY || document.documentElement.scrollTop;
                const header = document.querySelector('header');
                const infoPhoneHours = document.querySelector('.phoneAndWorkingHours');

                if (windowTop > 300) {
                    header.classList.add('headerShort');
                    infoPhoneHours.classList.add('hidden');
                } else {
                    header.classList.remove('headerShort');
                    infoPhoneHours.classList.remove('hidden');
                }
                }
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

  return (
    <header>
        <img src='/images/logo.svg'></img>
        <nav>
            {dataNavbar.map((item, index) => (
                <>
                <div className='navdiv'key={index}>
                    <a href={item.link}>
                        {item.name}
                    </a>
                    </div>
                    {index !== dataNavbar.length - 1 && (
                        <hr className="navhr"/>
                    )}
                </>
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