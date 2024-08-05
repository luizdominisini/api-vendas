import dataSource from "../../../../shared/typeorm";
import User from "../entities/User";

const UserRepository = dataSource.getRepository(User);
export default UserRepository;
