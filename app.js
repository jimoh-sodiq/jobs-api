import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authRoute from "./routes/auth.js";
import jobsRoute from "./routes/jobs.js";
import connectDB from "./db/connect.js";
import authenticationMiddleware from "./middleware/auth.js";
import helmet from "helmet";
import cors from "cors";
import rateLimiter from "express-rate-limit";

dotenv.config();

const app = express();

// middleware
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRoute);

// always at the end of middleware functions
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
