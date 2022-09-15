import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { FaUserAlt, FaLock } from "react-icons/fa";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import { UserContext } from "../context/context";
import Alerts from "../components/Alerts";

const Login = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [errMessage, setErrMessage] = useState("");
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        isOnline: true,
      });
      setUser(userCredential.user);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      setErr(true);
      const errorMsg = error.message;
      if (errorMsg.includes("password")) {
        setErrMessage("Incorrect password");
        setFormData({
          ...formData,
          password: "",
        });
      } else if (
        errorMsg.includes("user-not-found") ||
        errorMsg.includes("email")
      ) {
        setErrMessage("Email not found");
        setFormData({
          ...formData,
          email: "",
          password: "",
        });
      } else {
        setErrMessage(errorMsg);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {err && <Alerts message={errMessage} setErr={setErr} />}
      <div className="form-container">
        <div className="form-title">
          <h3>Sign In</h3>
          <p>Sign In to continue to CoolChat!! Check It Out</p>
        </div>
        <form action="#">
          <div className="form-group">
            <label htmlFor="email"> Email </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <FaUserAlt className="form-icon" />
          </div>
          <div className="form-group">
            <label htmlFor="password"> Password </label>
            <input
              type="password"
              name="password"
              required
              className="form-control"
              id="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter your password"
            />
            <FaLock className="form-icon" />
          </div>
          <button onClick={signIn}>Sign In</button>
          <p className="text-center">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
