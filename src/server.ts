import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { cookieSessionMiddleware } from "./middlewares/main.middleware";

const app = express();

const CUSTOM_LOGGER = (message: string) => (req, res, next) => {
  console.log(`hello from ${message}`);
  next();
};

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CUSTOM_LOGGER("hello from custom logger"));
app.use(cookieSessionMiddleware);

app.get("/", (req, res, next) => {
  // console.log("hello from express!");
  // res.status(200);
  res.json({ message: "Hello" });
});

app.use("/api", router);

app.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: `oops! there was an error! the error is: ${err}` });
});

export default app;
