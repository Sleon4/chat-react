import { Route, Routes } from "react-router-dom";
import NavbarNavigation from "./pages/components/NavbarNavigation";

import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthMiddleware from "./pages/Middleware/AuthMiddleware";

function App() {
  return (
    <>
      <NavbarNavigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/login" element={<Login />} />

        <Route
          path="chat"
          element={
            <AuthMiddleware>
              <Chat />
            </AuthMiddleware>
          }
        />
      </Routes>
    </>
  );
}

export default App;
