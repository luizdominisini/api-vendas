import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = request.user.id;
    const user = await showProfile.execute({ user_id });
    console.log(request.user.id);
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = new UpdateProfileService();
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return response.json(user);
  }
}

export default ProfileController;
