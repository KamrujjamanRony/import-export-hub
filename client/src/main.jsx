import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { router } from "./routes/router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--toast-bg, #fff)",
              color: "var(--toast-fg, #0f172a)",
            },
            success: { iconTheme: { primary: "#1a62ed", secondary: "#fff" } },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
