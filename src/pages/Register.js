import { useState, useContext } from "react";
import { UserContext } from "../context/context";
import { FaUserAlt, FaLock, FaIdCard } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Alerts from "../components/Alerts";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const signUp = async (e) => {
    e.preventDefault();
    if (formData.password.length >= 6) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        }).catch((err) => console.log(err));
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
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
        navigate("/");
      } catch (error) {
        console.log(error);
        setErr(true);
        const errorMsg = error.message;
        if (
          errorMsg.includes("user-not-found") ||
          errorMsg.includes("invalid-email")
        ) {
          setErrMessage("Incorrect email format");
          setFormData({
            ...formData,
            email: "",
            password: "",
          });
        }
        if (errorMsg.includes("email-already-in-use")) {
          setErrMessage("Email already exists");
          setFormData({
            ...formData,
            email: "",
            password: "",
          });
        }
      }
    } else {
      setPasswordErr(true);
      setFormData({
        ...formData,
        password: "",
      });
    }
  };

  useEffect(() => {
    if (formData.password.length >= 6) {
      setPasswordErr(false);
    }
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {err && <Alerts message={errMessage} setErr={setErr} />}
      <div className="form-container">
        <div className="form-title">
          <h3>Sign Up</h3>
          <p>Sign Up to continue to CoolChat</p>
        </div>
        <form action="#" onSubmit={signUp}>
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
            {passwordErr && (
              <p className="form-error">
                Password must be at least 6 characters long.
              </p>
            )}
          </div>
          <button type="submit">Sign Up</button>
          <p className="text-center">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
