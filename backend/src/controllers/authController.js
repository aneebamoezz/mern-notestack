import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const forgotPassword = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("REQ EMAIL:", email);

    const user = await User.findOne({ email });

    console.log("DB EMAIL:", user?.email);

    if (!user) {
      return res.status(404).json({ message: "No user found with this email" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    console.log("RESET URL:", resetUrl);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"${user.email}" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Password Reset",
      html: `
        <p>Hello ${user.name}</p>
        <p>Click below to reset password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });

    console.log("MAIL SENT TO:", email);
    console.log("MAIL INFO:", info.messageId);

    return res.status(200).json({
      message: "Reset link sent to your email.",
      resetUrl,
    });
  } catch (error) {
    console.log("Forgot password error:", error);
    return res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};