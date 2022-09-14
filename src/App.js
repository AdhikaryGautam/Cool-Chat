import "./App.css";
import "./pages/Register.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Chat from "./pages/Chat.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/context.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Profile from "./components/Profile";
import ChatList from "./components/ChatList";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute redirectTo="/login">
                <Chat Component={ChatList} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectTo="/login">
                <Chat Component={Profile} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
