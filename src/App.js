import "./App.css";
import About from "./components/about/About.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import LegalFees from "./components/legalFees/LegalFees.jsx";
import Cases from "./components/cases/cases.jsx";
import Contacts from "./components/contacts/Contacts.jsx";
import Footer from "./components/footer/Footer.jsx";
import Consent from "./components/consent/Consent.jsx";
import Hero from "./components/hero/Hero.jsx";
import Jurists from "./components/jurists/Jurists.jsx";

function App() {
  return (
    <>
    <Navbar />
    <main style={{"margin":"1rem"}}>
      <Hero />
      <About />
      <Consent />
      <Jurists />
      <LegalFees />
      <Cases />
      <Contacts />
    </main>
    <Footer />
    </>
  );
}

export default App;
