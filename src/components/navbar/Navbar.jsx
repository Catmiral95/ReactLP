export default function Navbar() {
  const navbarStyle = {
    display: 'flex', 
    flexDirection: 'row',
    gap: '10px'
  }
  return(<div style={navbarStyle}>
    <a>Главная</a>
    <a>О нас</a>
    <a>Услуги</a>
    <a>Кейсы</a>
    <a>Контакты</a>
    </div>);
}
