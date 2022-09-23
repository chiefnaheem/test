import Joi from "joi";
import { Schema, model } from "mongoose";
import Validator from "validator";

export interface IUser {
    name: string;
    email: string;
    age: number
    occupation: string;
    employmentStatus: boolean;
    yearsEmployed: number;
    password: string;
    address: string;
    score?: number
}

const userschema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      validate: {
        validator: Validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please input your password"],
    },

    employmentStatus: {
      type: Boolean,
      default: false,
    },
    yearsEmployed: {
        type: Number,
        default: 0
    },
    occupation: {
        type: String,
        default: 'unemployed'
    },
    age: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        default: 'unspecified'
    },
    score: {
        type: Number;
        default: 0;
    }

  },
  {
    timestamps: true,
  }
);
const User = model<IUser>("User", userschema);

export const validateUser = (user: IUser) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        age: Joi.number(),
        occupation: Joi.string(),
        employmentStatus: Joi.boolean(),
        yearsEmployed: Joi.number()
    })
    return schema.validate(user)
}



export default User;
