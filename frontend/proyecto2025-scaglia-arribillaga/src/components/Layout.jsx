import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "@components/Header";

export default function Layout() {
  const [buscar, setBuscar] = useState(() => () => {});
  const [filtrar, setFiltrar] = useState(() => () => {});

  return (
    <>
      <Header onBuscar={buscar} onFiltrar={filtrar} />

      <main>
        <Outlet context={{ setBuscar, setFiltrar }} />
      </main>
    </>
  );
}
