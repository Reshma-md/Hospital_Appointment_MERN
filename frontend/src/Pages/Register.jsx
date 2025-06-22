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
  const [otp, setOtp] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false); // OTP verification state

  const navigateTo = useNavigate();

  // Function to send OTP
  const sendOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/auth/send-otp", { phone });
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP. Try again.");
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/auth/verify-otp", { phone, otp });
      if (data.success) {
        setOtpVerified(true);
        toast.success("OTP verified successfully!");
      } else {
        toast.error("Invalid OTP.");
      }
    } catch (error) {
      toast.error("OTP verification failed.");
    }
  };

  // Function to handle registration
  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify OTP before registration.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/user/register", {
        firstName, lastName, email, phone, dob, gender, password
      });

      toast.success("Registration successful!");
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegistration}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div>
          <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button type="button" onClick={sendOtp}>Send OTP</button>
        </div>

        <div>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button type="button" onClick={verifyOtp}>Verify OTP</button>
        </div>

        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" disabled={!otpVerified}>Register</button>
      </form>
      <p>Already registered? <Link to="/signin">Login Now</Link></p>
    </div>
  );
};

export default Register;
