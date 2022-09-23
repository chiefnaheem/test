import { Request, Response, NextFunction } from "express";

import bcrypt from "bcrypt";
// import User from "../model/user.model";
import User, { IUser } from "../model/user.model";

const hashedPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
};
//REGISTER
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, age, occupation, employmentStatus, yearsEmployed, address } =
    req.body;

  const hashedPass = hashedPassword(password);

  const newUser: any = await User.create({
    name,
    employmentStatus,
    yearsEmployed,
    email,
    age,
    password: hashedPass,
    occupation,
    address,
    score: 0,
  });
  let score = 0;
  
  if (newUser.age < 18) {
    return res.status(400).send({ score, message: "Your total score is 0" });
  }
  if (newUser.employmentStatus === false) {
    return res.status(400).send({ score, message: "You are not eligible" });
  }
  if (newUser.yearsEmployed < 2) {
    return res.status(400).send({ score, message: "You are not eligible" });
  }
  if (newUser.occupation === "unemployed") {
    return res.status(400).send({ message: "You are not eligible" });
  }
  if (newUser.address === "unspecified") {
    return res.status(400).send({ message: "You are not eligible" });
  }
  if (newUser.age >= 18) {
    score += 1;
  }
  if (newUser.employmentStatus === true) {
    score += 1;
  }
  if (newUser.yearsEmployed >= 2) {
    score += 1;
  }
  if (newUser.occupation !== "unemployed") {
    score += 1;
  }
  if (newUser.address !== "unspecified") {
    score += 1;
  }
  newUser.score = score
  await newUser.save()
  return res.status(201).send({ data: newUser, message: "sign up successful" });
};

//LOGIN
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send({ message: "Invalid credentials" });
  }
  return res.status(200).send({ message: "Login successful" });
};

//LOGIC

export const scoreFormInformation = async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find({sort: {score: -1}});
  
  return res.status(200).send(users);
};
