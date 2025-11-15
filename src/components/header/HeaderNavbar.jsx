import './header_and_navbar.css'
import Navbar from './Navbar'
import { useRef } from 'react';

export default function Header({windowWidth}){
    const dialogRef = useRef(null);
    const isMobile = windowWidth <= 1200;

    const handleDialogClick = (e) => {
        if (e.target === dialogRef.current) {
            dialogRef.current.close();
        }
    };
    const openDialog = () => dialogRef.current.showModal();

    return(
    <header className={`row ${isMobile && "mobile-header"}`}>
        {!isMobile ? (<>
            <img src="/images/logo.svg" alt="лого Лидер Права"/>
            <div className={"row"} style={{flexGrow:'0.5', justifyContent: 'space-between'}}>
                <Navbar />
                <div className='hours-and-phone-container col'  style={{flexGrow:'0.1'}}>
                    <p id="working-hours">
                        пн-пт 9:00 - 18: 00
                    </p>
                    <p>
                        <a href='tel:+79613467077'>+7(961)346-70-77</a>
                    </p>
                </div>
            </div>     
            </>
         )
         : (
            <>
            <button
                name="burger menu"
                type="button"
                onClick={openDialog}
                >
                ☰
            </button>
                <dialog
                        className='col menu-dialog'
                        ref={dialogRef}
                        onClick={handleDialogClick}
                        closedby='any'
                        >
                    <img src="/images/logo.svg" alt="лого Лидер Права"/>
                    <Navbar onLinkClick={() => dialogRef.current?.close()} />
                </dialog> 
            </>
         )}
    </header>
    )
}