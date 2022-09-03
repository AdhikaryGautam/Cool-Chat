import "./App.css";
import "./pages/Register.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Chat from "./pages/Chat.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/context.js";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
