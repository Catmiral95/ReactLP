import './navbar.css';
import dataNavbar from '../../data/dataNavbar.json';    

export default function Navbar() {
  return (
        <nav>
            <img src='/images/logo.svg'></img>
            {dataNavbar.map((item, index) => (
                <div className='navdiv'key={index}>
                    <a href={item.link}>
                        {item.name}
                    </a>
                    {index !== dataNavbar.length - 1 && (
                        <picture>
                            <source media="(max-width: 650px)" srcSet="/images/horizontalDash.svg" />
                            <img src="/images/verticalDash.svg"/>
                        </picture>
                    )}
                </div>
            ))}
            <div className='phoneAndWorkingHours'>
                <p>
                    пн-пт 9:00-18:00
                </p>
                <p>
                    +7(961)346-70-77
                </p>
            </div>
        </nav>
    );
}