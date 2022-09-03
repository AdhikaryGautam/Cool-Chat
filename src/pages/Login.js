import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { FaUserAlt, FaLock, FaIdCard } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import { AuthContext } from "../context/context";

const Login = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signIn = async (e) => {
    e.preventDefault();
    if (formData.password.length >= 6) {
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
          name: "",
          email: "",
          password: "",
        });
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <div className="form-title">
        <h3>Sign In</h3>
        <p>Sign In to continue to CoolChat</p>
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
      </form>
    </div>
  );
};

export default Login;
