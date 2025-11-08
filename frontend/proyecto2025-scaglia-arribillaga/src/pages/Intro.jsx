import { useEffect, useState } from "react";
import "@styles/intro.scss";

export default function Intro({ onFinish }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        setHide(true);
        setTimeout(() => onFinish(), 500); 
      }
    };

    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
  }, [onFinish]);

  return (
    <section id="intro" className={hide ? "hide" : ""}>
      <h1>Bienvenido a la Pokédex</h1>
      <p>Presiona <strong>Enter</strong> para continuar</p>
    </section>
  );
}

