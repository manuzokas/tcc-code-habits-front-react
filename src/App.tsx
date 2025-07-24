import { RouterProvider } from "react-router-dom";
import { router } from "./routes"; 
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { ThemeProvider } from "@/shared/contexts/theme/ThemeProvider";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}
