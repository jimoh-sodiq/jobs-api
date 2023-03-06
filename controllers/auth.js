import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, UnauthenticatedError } from "../errors/index.js";

/**
 * REGISTER USER
 * validate - name, email, password with mongoose,
 * hash password with bcrypt
 * save user
 * generate token
 * save response with token
 */

// before saving the user, we use mongoose to gen salt and hash password
export const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      userId: user._id,
    },
    token,
    msg: "user created successfully",
  });
};

/**
 *
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  //   compare password
  const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials");
    }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};
