import "./App.css";
import About from "./components/about/About.jsx";
import Consent from "./components/consent/Consent.jsx";
import Navber from "./components/navbar/Navbar.jsx"

function App() {
  return (
    <div>
      <Navber />
      <About />
      <Consent />
    </div>
  );
}

export default App;
