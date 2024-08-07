import AppError from "../../../shared/errors/AppError";
import UserTokenRepository from "../typeorm/repositories/UsersTokensRepository";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcrypt";

interface IRequest {
  password: string;
  token: string;
}

class ResetPasswordService {
  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await UserTokenRepository.findOneBy({ token });
    if (!userToken) {
      throw new AppError("User token does not exist.");
    }

    const user_id = userToken.user_id;
    const user = await UserRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError("User does not exist.");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.");
    }

    const passwordHash = await hash(password, 8);
    user.password = passwordHash;
    await UserRepository.save(user);
  }
}

export default ResetPasswordService;
