import { useEffect, useRef, useCallback } from "react";

const SwipeComponent = (callbacks) => {
  const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } = callbacks;
  const xDown = useRef(null);
  const yDown = useRef(null);

  const getTouches = useCallback((evt) => {
    return evt.touches || evt.originalEvent?.touches;
  }, []);

  const handleTouchStart = useCallback(
    (evt) => {
      const firstTouch = getTouches(evt)[0];
      xDown.current = firstTouch?.clientX || null;
      yDown.current = firstTouch?.clientY || null;
    },
    [getTouches],
  );

  const handleTouchMove = useCallback(
    (evt) => {
      if (!xDown.current || !yDown.current) {
        return;
      }

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;

      const xDiff = xDown.current - xUp;
      const yDiff = yDown.current - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      } else {
        if (yDiff > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }

      xDown.current = null;
      yDown.current = null;
    },
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown],
  );

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchStart, handleTouchMove]);

  return null;
};

export default SwipeComponent;
