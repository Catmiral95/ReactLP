import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.jsx";
import Header from "../components/header/HeaderNavbar.jsx";
import ScrollUp from "../components/scroll up/ScrollUpBtn.jsx";
import { useWindowWidth } from "../context/WindowWidth.jsx";

export default function Layout() {
  return (
    <>
      {useWindowWidth() > 1200 && <ScrollUp />}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
