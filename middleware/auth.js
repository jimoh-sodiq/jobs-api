import User from "../models/user.js";
import jwt from "jsonwebtoken"
import { UnauthenticatedError } from '../errors/index.js';

const authenticationMiddleware = async (req, res, next) => {
    // check headers
    const authHeader  = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token  = authHeader.split(' ')[1]
    
    try {
        // attach user to job routes
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        // or check from db -(put inside try catch block) and remove the password
        // const user = User.findById(payload.id).select('-password')
        // req.user = user
        next()
    } catch (e) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

export default authenticationMiddleware