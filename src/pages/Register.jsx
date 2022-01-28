import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router";

const userObj = {
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(userObj);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      console.log(user, "...");
      setNewUser(userObj);
      alert("Account has been created sucessfully...");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="register-main">
      <h3> Register New User </h3>
      <form onSubmit={handleSubmit}>
        <input
          className="register-field"
          name="email"
          placeholder="Email..."
          onChange={handleChange}
        />
        <input
          className="register-field"
          name="password"
          placeholder="Password..."
          onChange={handleChange}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default Register;
