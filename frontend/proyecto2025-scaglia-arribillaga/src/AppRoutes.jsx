import { Routes, Route } from "react-router-dom";
import App from "./App";

import Intro from "@pages/Intro";
import PokemonCardPage from "@pages/PokemonCardPage";
import PokemonDetail from "@components/PokemonDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/* Intro */}
        <Route index element={<Intro />} />

        {/* Pokédex */}
        <Route path="pokedex" element={<PokemonCardPage />} />

        {/* Detalle */}
        <Route path="pokemon/:id" element={<PokemonDetail />} />
      </Route>
    </Routes>
  );
}
