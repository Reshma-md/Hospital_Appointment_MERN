import OTPModel from "../models/otp.model.js";  // OTP model (store OTPs)
import User from "../models/user.model.js";
import { sendOtpToPhone } from "../utils/otpService.js"; // Utility to send OTP

// Store OTPs temporarily
const otpStore = new Map();

export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: "Phone number required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, otp);

  try {
    await sendOtpToPhone(phone, otp);
    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "OTP sending failed" });
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ success: false, message: "Phone and OTP required" });

  if (otpStore.get(phone) === otp) {
    otpStore.delete(phone);
    res.json({ success: true, message: "OTP verified successfully!" });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
};
