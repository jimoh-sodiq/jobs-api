import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error.js'

class NotFoundError extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.UNAUTHORIZED
    }
  }
  
  export default NotFoundError
  