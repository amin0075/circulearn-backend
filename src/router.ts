import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputsError } from "./modules/middleware";
import dbclient from "./db";

const router = Router();

// get results from a quiz

router.post("/quiz", async (req, res, next) => {
  // get result as json, score (number) from request body
  const { result } = req.body;
  const score = 20;
  if (!score || !result) {
    return res.status(400).json({ message: "result is required" });
  }
  const session = req.session;
  if (!session) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const isSessionExist = await dbclient.quizResult.findFirst({
      where: {
        sessionId: session,
      },
    });
    if (isSessionExist) {
      return res
        .status(406)
        .json({
          code: "Session_Exists_in_DB",
          message: "you already have sent your results",
        });
    }
    await dbclient.quizResult.create({
      data: {
        score: Number(score),
        sessionId: session,
        result,
      },
    });
    res.json({ message: "quiz result created", score });
  } catch (error) {
    next(error);
  }
});

export default router;
