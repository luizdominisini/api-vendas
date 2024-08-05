import AppError from "../../../shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import path from "path";
import uploadConfig from "../../../config/upload";
import fs from "fs";

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await UserRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new AppError("User not found");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await UserRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
