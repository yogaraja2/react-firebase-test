import React, { useState } from "react";
import { signInWithGoogle } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const userObj = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(userObj);
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      console.log(result);
      const uname = result?.user.email.slice(
        0,
        result?.user.email.indexOf("@")
      );
      const user = {
        name: uname,
        email: result?.user.email,
        photoURL: result?.user.photoURL || "",
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/newChannel");
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInByGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = {
          name: result?.user.displayName,
          email: result?.user.email,
          photoURL: result?.user.photoURL,
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/newChannel");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("../", user);
  return (
    <div className="login-main">
      <h3> Login </h3>
      <form onSubmit={handleLogin}>
        <input
          className="login-field"
          name="email"
          placeholder="Email..."
          onChange={handleChange}
        />
        <input
          className="login-field"
          name="password"
          placeholder="Password..."
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
      <h5>OR</h5>
      <button className="login-with-google-btn" onClick={signInByGoogle}>
        Sign in with Google
      </button>
      <div style={{ marginTop: "20px" }}>
        <h4>
          New User ?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Register Here...
          </Link>{" "}
        </h4>
      </div>
    </div>
  );
};

export default Login;
