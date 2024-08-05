import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSessions = new CreateSessionsService();
    const user = await createSessions.execute({ email, password });
    return response.json(user);
  }
}

export default SessionsController;
