import AppError from "../../../shared/errors/AppError";

import UserTokenRepository from "../typeorm/repositories/UsersTokensRepository";
import UserRepository from "../typeorm/repositories/UsersRepository";
import EtheralMail from "../../../config/mail/etherealMail";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new AppError("User does not exist.");
    }
    console.log(user);
    const user_id = user.id;
    try {
      const userToken = UserTokenRepository.create({ user_id });
      await UserTokenRepository.save(userToken);
      // console.log(userToken);
      await EtheralMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: "Api Vendas: Recuperação de senha.",
        templateData: {
          template: `Solicitação de redefinição de senha ${userToken.token}`,
          variables: {
            name: user.name,
            token: userToken.token,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default SendForgotPasswordEmailService;
