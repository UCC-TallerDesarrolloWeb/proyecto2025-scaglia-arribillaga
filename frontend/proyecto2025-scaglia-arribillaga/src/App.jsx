import { useState } from "react";
import Intro from "@pages/Intro";


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

