import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { SnackbarProvider } from "./context/SnackbarContext";

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
