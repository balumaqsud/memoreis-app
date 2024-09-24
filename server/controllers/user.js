import mongoose from "mongoose";
import UserModel from "../models/userModel.js";

import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = UserModel.findOne({ email });

    // if user does not exist
    if (!existingUser)
      return res.status(404).json({ message: "user email does not exist" });

    // if password is incorrect
    const isPasswordCorrect = await bycrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "password is incorrect" });

    //if everything is OK

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      test,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    //checking if the user already exist
    const existingUser = UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist " });
    // chekcing if the passwords match
    if (password !== confirmPassword)
      return res.status(400).json({ message: "passwords do not match" });

    //hashing and creatign the user / and the token

    const hashedPassowrd = await bycrypt.hash(password);

    const result = UserModel.create({
      email,
      password: hashedPassowrd,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    // sending successfully created result/user
    res.status(200).json({ result, token });
    //
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
