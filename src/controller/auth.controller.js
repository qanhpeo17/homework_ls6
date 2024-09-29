import UserModel from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/keys.js";
const register = async (req, res) => {
  const { userName, email, age, avatar, password } = req.body;
  //check exist
  const checkExistingUser = await UserModel.findOne({ email: email });

  if (checkExistingUser) {
    return res.status(404).json({
      Message: "Email already exists",
    });
  }
  const newUser = {
    userName,
    email,
    age,
    avatar,
    password,
  };
  const insertNewUser = await UserModel.create(newUser);
  if (!insertNewUser) {
    return res.status(500).json({
      error: "failed to create user",
    });
  }
  res.status(200).json({
    message: "user created successfully",
    user: insertNewUser,
  });
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const isPasswordValid = password == user.password;
    //const token = `web83.${user.email}.${uuidv4()}`;

    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    //payload la nap cac thong tin ma minh muon co trong token
    const payload = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successfully",
      data: token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

const authController = {
  register,
  login,
};
export default authController;
