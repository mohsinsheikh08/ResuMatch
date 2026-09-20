import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/auth.model";
import blackListModel from "../models/blacklist.model";


const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error instanceof Error ? error.message : null,
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error instanceof Error ? error.message : null,
    });
  }
};
const logoutController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    res.clearCookie("token");

    await blackListModel.create({ token });

    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error instanceof Error ? error.message : null,
    });
  }
};


const getUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated!" });
    }

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error instanceof Error ? error.message : null,
    });
  }
};

export { registerController, loginController, logoutController, getUserController };