import About from "../components/about/About.jsx";
import Hero from "../components/hero/Hero.jsx";
import LegalFees from "../components/legalFees/LegalFees.jsx";
import Cases from "../components/cases/cases.jsx";
import Contacts from "../components/contacts/Contacts.jsx";
import Consent from "../components/consent/Consent.jsx";

export default function Main() {
  return (
    <main>
      <Hero />
      <About />
      <Consent />
      <LegalFees />
      <Cases />
      <Contacts />
    </main>
  );
}
