import { createContext, useContext } from "react";

export const WindowWidthContext = createContext(null);

export const useWindowWidth = () => {
  const windowWidth = useContext(WindowWidthContext);
  if (!windowWidth) {
    throw new Error("Ошибка использования WindowWidthContext");
  }

  return windowWidth;
};
