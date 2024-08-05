import { Router } from "express";
import UserController from "../controller/UserController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const userController = new UserController();

usersRouter.get("/", isAuthenticated, userController.index);
usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

export default usersRouter;
