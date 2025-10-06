import "./App.css";
import About from "./components/about/About.jsx";
import Consent from "./components/consent/Consent.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import LegalFees from "./components/legalFees/LegalFees.jsx";
import Message from "./components/messageSentNotification/message.jsx";
import Cases from "./components/cases/cases.jsx";


function App() {
  return (
    <div>
      <Navbar />
      <About />
      <LegalFees />
      <Cases />
      <Message />
    </div>
  );
}

export default App;
