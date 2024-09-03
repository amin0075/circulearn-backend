// this middleware will be used to make cookie session for incoming requests

import { NextFunction, Response, Request } from "express";
import nodeCrypto from "node:crypto";

declare global {
  namespace Express {
    interface Request {
      session: string;
    }
  }
}

export const cookieSessionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.SECRET) {
    throw new Error("SECRET is not defined");
  }
  // if user has no session, create a new session
  const cookies = req.headers.cookie;
  let session = getCookie(cookies, "session");
  if (cookies && cookies.includes("session")) {
    req.session = session;
    return next();
  }

  session = makeTokden();
  // cookie session expires in 1 week
  res.setHeader("Set-Cookie", `session=${session}; HttpOnly; Max-Age=604800`);
  req.session = session;
  next();
};

function makeTokden() {
  return nodeCrypto.randomBytes(16).toString("hex");
}

function getCookie(cookies: string, name: string) {
  if (!cookies) {
    return null;
  }
  const cookie = cookies.split(";").find((cookie) => cookie.includes(name));
  if (!cookie) {
    return null;
  }
  return cookie.split("=")[1];
}
