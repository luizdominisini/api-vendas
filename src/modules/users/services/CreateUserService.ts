import { hash } from "bcrypt";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    try {
      const emailExist = await UserRepository.findOneBy({ email });

      if (emailExist) {
        throw new AppError("This email adress already used");
      }

      const hashedPassword = await hash(password, 8);

      const user = UserRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      await UserRepository.save(user);

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default CreateUserService;
