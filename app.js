import 'express-async-errors'
import * as dotenv from 'dotenv'
import express from 'express'
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authRoute from './routes/auth.js'
import jobsRoute from './routes/jobs.js'
import connectDB from './db/connect.js'
import authenticationMiddleware from './middleware/auth.js'

dotenv.config()

const app = express();
// middleware

app.use(express.json());

// routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/jobs', authenticationMiddleware , jobsRoute)

// always at the end of middleware functions
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
