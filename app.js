import express, { json } from "express";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";
import cors from "cors";
import Mailroute from "./src/routes/Mail_Route.js";

const app = express();
// Global Middleware - it should comes before the request
// implement cors
// Access control origin allow
app.use(cors());

app.use(cors({
  origin:"*"
}))

app.options("*", cors());

// set security http headers
app.use(helmet());

// development only morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// limit request from same api
const limiter = rateLimit({
  limit: 400,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP please try again in an hour!",
});

app.use(limiter);

// body parser
app.use(json({ limit: "10kb" }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// Route Handlers
// Routes
app.use("/api/v1/mail", Mailroute);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Cant find ${req.originalUrl} on this server!`,
  });
});

export default app;
