import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/theme/index.js";
import themeDark from "./assets/theme-dark/index.js";

import { useUIContextController } from "context";
import Authenticator from "./components/auth/Authenticator.js";


export default function App() {
  const [controller] = useUIContextController();
  const { darkMode } = controller;

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Authenticator />
    </ThemeProvider>
  );
}
