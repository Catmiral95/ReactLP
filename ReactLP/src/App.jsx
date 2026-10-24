import "./App.css";
import Layout from "./pages/Layout.jsx";
import Main from "./pages/Main.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ConsentText from "./pages/ConsentText.jsx";
import NotFoundScreen from "./pages/NotFoundScreen.jsx";
import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router";
import { WindowWidthContext } from "./context/WindowWidth.jsx";
import ScrollToTop from "./hooks/ScrollToTop.jsx";

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
    <WindowWidthContext value={windowWidth}>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/privacy_policy" element={<PrivacyPolicy />} />
            <Route path="/consent" element={<ConsentText />} />
            <Route path="/*" element={<NotFoundScreen />} />
          </Route>
        </Routes>
      </HashRouter>
    </WindowWidthContext>
  );
}

export default App;
