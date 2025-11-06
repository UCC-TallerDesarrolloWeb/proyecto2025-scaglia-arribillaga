import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav style={{ background: "#cc0000", padding: "1rem" }}>
        <Link to="/" style={{ color: "white", fontSize: "20px" }}>Inicio</Link>
      </nav>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}
