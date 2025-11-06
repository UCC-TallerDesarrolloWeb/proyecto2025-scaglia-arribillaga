import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

// ✅ CSS usando alias reales
import "@styles/globals.css";
import "@styles/layout.css";
import "@styles/pokedex.css";
import "@styles/detail.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

