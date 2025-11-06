import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ Tus componentes reales
import Header from "@components/Header";

// ✅ Tus páginas reales
import Intro from "@pages/Intro";
import Pokedex from "@pages/Pokedex";
import PokemonDetail from "@pages/PokemonDetail";
import NotFound from "@pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
