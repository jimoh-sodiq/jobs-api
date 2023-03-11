import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message, success: false });
  // }
  if( err.name == 'ValidationError'){
    customError.msg = Object.values(err.errors).map( item => item.message).join(',')
    customError.statusCode = 400
  }
  if(err.name == 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 400
  }
  if(err.code && err.code == 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field`
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
