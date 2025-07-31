// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/assets/styles/App.css";
import { SupabaseProvider } from "@/contexts/SupabaseProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </React.StrictMode>
);
