import { Route, Routes } from "react-router-dom";
import NavbarNavigation from "./pages/components/NavbarNavigation";

import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <NavbarNavigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chat" element={<Chat />} />
        <Route path="auth/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
