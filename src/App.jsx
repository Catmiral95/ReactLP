import "./App.css";
import Header from "./components/header/Header.jsx"
import About from "./components/about/About.jsx";
import LegalFees from "./components/legalFees/LegalFees.jsx";
import Cases from "./components/cases/cases.jsx";
import Contacts from "./components/contacts/Contacts.jsx";
import Footer from "./components/footer/Footer.jsx";
import Consent from "./components/consent/Consent.jsx";
import Hero from "./components/hero/Hero.jsx";
import Jurists from "./components/jurists/Jurists.jsx";
import { useState, useEffect } from "react";


function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  return (
    <>
    <Header />
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
