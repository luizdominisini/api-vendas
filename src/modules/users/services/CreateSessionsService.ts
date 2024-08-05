import { compare } from "bcrypt";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    try {
      const user = await UserRepository.findOneBy({ email });

      if (!user) {
        throw new AppError("Incorrect email/password combination.", 401);
      }

      const passwordConfirmed = await compare(password, user.password);
      if (!passwordConfirmed) {
        throw new AppError("Incorrect Password combination.", 401);
      }

      const token = sign({}, authConfig.jwt.secret, {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      });

      return {
        user,
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default CreateSessionsService;
