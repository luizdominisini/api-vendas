import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const update = new UpdateUserAvatarService();
    const user = await update.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename, //Verificar pasta Notes.txt;
    });
    return response.json(user);
  }
}

export default UserAvatarController;
