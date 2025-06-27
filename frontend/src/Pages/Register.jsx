import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  // Function to handle registration
  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/user/patient/register", {
        firstName, lastName, email, phone, nic, dob, gender, password
      });

      toast.success("Registration successful!");
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegistration} className="register-form-narrow">
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input
          type="text"
          placeholder="Aadhar"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          maxLength={12}
        />
        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
      <p style={{ textAlign: "right", marginTop: "16px", paddingRight: "100px" }}>
        Already registered? <Link to="/signin">Login Now</Link>
      </p>
    </div>
  );
};

export default Register;