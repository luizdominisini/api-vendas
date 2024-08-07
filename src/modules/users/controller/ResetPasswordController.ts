import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const resetPass = new ResetPasswordService();
    const { password, token } = request.body;
    await resetPass.execute({ password, token });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
