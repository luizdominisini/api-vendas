import { Router } from "express";
import SessionsController from "../controller/SessionsController";
import { celebrate, Joi, Segments } from "celebrate";

const sessionsRouter = Router();
const sessionController = new SessionsController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create
);

export default sessionsRouter;
