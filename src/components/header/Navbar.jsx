import menu from '../../data/dataNavbar.json';

export default function Navbar() {
    return(
        <nav className='container'>
            {menu.map((item) => (<MenuItem name={item.name} link={item.link} key={item.id} id={item.id} length={menu.length}/>))}
        </nav>
    )
}

function MenuItem(props){
    return(
    <div className='container'>
        <a href={props.link}>{props.name}</a>
        {props.id !== props.length && (<hr />)}
    </div>)
}