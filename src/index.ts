import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: process.env.NODE_ENV === "development" ? path.resolve(process.cwd(), '.env.development') : undefined
});

import app from "./server";
import config from "./config";

console.log(process.env.DATABASE_URL);

app.listen(config.port, () => {
  console.log(`Server running on http://172.187.161.136:${config.port}`);
});
