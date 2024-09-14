import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  preflightContinue: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieSessionMiddleware);
app.set('trust proxy', 1)
app.use(session({
  name: 'session',
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  }
}));

app.use("/", router);

app.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: `Error: ${err.message}` });
});

export default app;
