import menu from '../../data/dataNavbar.json';

export default function Navbar({onLinkClick}) {

    return(
        <nav className='container'>
            {menu.map((item) => 
                (<MenuItem name={item.name} link={item.link} 
                            key={item.id} id={item.id} length={menu.length} 
                            onLinkClick={onLinkClick}/>))}
        </nav>
    )
}

function MenuItem(props){
    const handleLinkClick = (e) => {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        // Закрываем диалог
        if (props.onLinkClick) { // Берем из props
            props.onLinkClick();
        }
        
        // Навигация после закрытия диалога
        setTimeout(() => {
            window.location.hash = href;
        }, 100);
    };

    return(
    <div className='container'>
        <a href={props.link} onClick={handleLinkClick}>{props.name}</a>
        {props.id !== props.length && (<hr />)}
    </div>)
}