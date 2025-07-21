import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/App.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { SupabaseProvider } from "@/providers/SupabaseProvider";

// chave publica do clerk importada do .env
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/*
ClerkProvider: serviço de autenticação terceirizado
Supabase: Baas terceirizado para back-end
*/
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </ClerkProvider>
  </React.StrictMode>
);