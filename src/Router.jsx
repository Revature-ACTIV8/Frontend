import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AuthPage from "./AuthPage.jsx";
import CartsPage from "./CartsPage.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/*home page */}
        <Route path="/" element={<App />} />

        <Route path="/auth" element={<AuthPage />} />

        <Route path="/cart" element={<CartsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
