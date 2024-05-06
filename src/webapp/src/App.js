import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/theme/index.js";
import themeDark from "./assets/theme-dark/index.js";

import routes from "Routes";

import { useUIContextController } from "context";


export default function App() {
  const [controller] = useUIContextController();
  const { darkMode } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/authentication/login" />} />
        
      </Routes>
    </ThemeProvider>
  );
}
