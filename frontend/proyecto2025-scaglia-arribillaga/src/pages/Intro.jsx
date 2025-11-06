import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Enter") navigate("/home");
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div id="intro">
      <h1>Bienvenido a la Pokédex</h1>
      <h3>Presiona ENTER para comenzar</h3>
    </div>
  );
}
