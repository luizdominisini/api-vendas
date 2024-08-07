import { compare, hash } from "bcrypt";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await UserRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new AppError("User not found.");
    }

    const userUpdateEmail = await UserRepository.findOneBy({ email });
    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError("This email alrealdy exist.");
    }

    if (password && !old_password) {
      throw new AppError("Old password is required.");
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password);
      if (!checkPassword) {
        throw new AppError("Old password does not exists.");
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await UserRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
