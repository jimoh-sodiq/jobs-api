// import jwt from "jsonwebtoken";
// import { UnauthenticatedError } from "../errors/index.js";

// const authenticationMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     throw new UnauthenticatedError("Unauthorized");
//   }
//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { id, username } = decoded;
//     req.user = { id, username };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError("Not authorized to access this route");
//   }
// };

// export default authenticationMiddleware;
