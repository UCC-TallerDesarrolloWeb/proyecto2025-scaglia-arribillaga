import { useState } from "react";
import Intro from "@pages/Intro";
import PokemonCardPage from "@pages/PokemonCardPage";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <PokemonCardPage />
      )}
    </>
  );
}

