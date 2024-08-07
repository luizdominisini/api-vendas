import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createToken = new SendForgotPasswordEmailService();
    const { email } = request.body;
    const user = await createToken.execute({ email });
    return response.status(204).json(user);
  }
}

export default ForgotPasswordController;
