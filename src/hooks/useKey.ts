import { useEffect, useState } from "react";

export function useKey(key: string = "") {
  const [pressed, setPressed] = useState(false);

  const match = (event: KeyboardEvent) =>
    key.toLowerCase() === event.key.toLowerCase();

  const onDown = (event: KeyboardEvent) => {
    if (match(event)) {
      setPressed(true);
    }
  };

  const onUp = (event: KeyboardEvent) => {
    if (match(event)) setPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);

    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [key]);

  return pressed;
}
