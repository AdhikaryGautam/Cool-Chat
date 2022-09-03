import { useState, useContext } from "react";
import { AuthContext } from "../context/context";
import { FaUserAlt, FaLock, FaIdCard } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(AuthContext);
  const signUp = async (e) => {
    e.preventDefault();
    if (formData.password.length >= 6) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: formData.name,
          email: formData.email,
          createdAt: userCredential.user.metadata.creationTime,
          isOnline: true,
        });
        setUser(userCredential.user);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
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
        <h3>Sign Up</h3>
        <p>Sign Up to continue to CoolChat</p>
      </div>
      <form action="#">
        <div className="form-group">
          <label htmlFor="email"> Name </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <FaIdCard className="form-icon" />
        </div>
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
        <button onClick={signUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
