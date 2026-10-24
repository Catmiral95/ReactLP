import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  //нужен для того, чтобы переход на дополнительные страницы показывал страницу с начала, а не с конца как раньше
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
