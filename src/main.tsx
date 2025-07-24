import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/assets/styles/App.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { SupabaseProvider } from "@/contexts/SupabaseProvider";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </ClerkProvider>
  </React.StrictMode>
);