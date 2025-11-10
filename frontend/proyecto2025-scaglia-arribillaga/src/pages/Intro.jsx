import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; //  agregar
import "@styles/intro.scss";

export default function Intro() {
  const [hide, setHide] = useState(false);
  const navigate = useNavigate(); //  agregar

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        setHide(true);

        //  esperar animación y navegar
        setTimeout(() => {
          navigate("/pokedex");
        }, 500);
      }
    };

    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
  }, [navigate]); //  dependencia correcta

  return (
    <section id="intro" className={hide ? "hide" : ""}>
      <h1>Bienvenido a la Pokédex</h1>
      <p>
        Presiona <strong>Enter</strong> para continuar
      </p>
    </section>
  );
}
