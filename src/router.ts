import { Router } from "express";
import dbclient from "./db";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/", async (req, res, next) => {
    res.json({
      message: "server is working"
    });
  
});
// Get all quiz results
router.get("/quiz", async (req, res, next) => {
  try {
    const quizResults = await dbclient.quizResult.findMany();
    res.json(quizResults);
  } catch (error) {
    next(error);
  }
});

// Get all feedback entries
router.get("/feedback", async (req, res, next) => {
  try {
    const feedbackEntries = await dbclient.feedback.findMany();
    res.json(feedbackEntries);
  } catch (error) {
    next(error);
  }
});

// Quiz submission route
router.post("/quiz", async (req, res, next) => {
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ message: "Answers are required" });
  }

  const session = req.session.id;
  if (!session) {
    return res.status(401).json({ message: "Unauthorized: Session required" });
  }  

  try {
    // Check if user has already submitted the quiz
    const existingQuiz = await dbclient.quizResult.findFirst({
      where: { sessionId: session },
    });

    if (existingQuiz) {
      return res.status(406).json({
        code: "Session_Exists_in_DB",
        message: "You have already submitted the quiz",
      });
    }

    // Calculate quiz score and evaluation results
    const correctAnswersPath = path.resolve(__dirname, "./lib/correctAnswers.json");
    const correctAnswers = JSON.parse(fs.readFileSync(correctAnswersPath, "utf8"));

    let score = 0;
    const evaluationResults = correctAnswers.evaluation.map((section, sectionIndex) => {
      return section.questions.map((question, questionIndex) => {
        const userAnswer = answers[`${sectionIndex}-${questionIndex}`];
        const correctAnswer = question.correctAnswer;

        const isCorrect = Array.isArray(correctAnswer)
          ? JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
          : userAnswer === correctAnswer;

        if (isCorrect) {
          score += 1;
        }

        return {
          questionId: question.id,
          userAnswer,
          correctAnswer,
          isCorrect,
        };
      });
    });

    await dbclient.quizResult.create({
      data: {
        score,
        sessionId: session,
        result: evaluationResults,
      },
    });

    res.json({ message: "Quiz result submitted", score });
  } catch (error) {
    next(error);
  }
});

// Feedback submission route
router.post("/feedback", async (req, res, next) => {
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: "Feedback is required" });
  }

  const session = req.sessionID;
  if (!session) {
    return res.status(401).json({ message: "Unauthorized: Session required" });
  }

  try {
    // Check if user has already submitted feedback
    const existingFeedback = await dbclient.feedback.findFirst({
      where: { sessionId: session },
    });

    if (existingFeedback) {
      return res.status(406).json({
        code: "Session_Exists_in_DB",
        message: "You have already submitted feedback",
      });
    }

    await dbclient.feedback.create({
      data: {
        feedback,
        sessionId: session,
      },
    });

    res.json({ message: "Feedback submitted" });
  } catch (error) {
    next(error);
  }
});

export default router;
