import UserToken from "../entities/UserToken";
import dataSource from "../../../../shared/typeorm";

const UserTokenRepository = dataSource.getRepository(UserToken);
export default UserTokenRepository;
