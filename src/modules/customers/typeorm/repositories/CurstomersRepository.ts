import dataSource from "../../../../shared/typeorm";
import Customer from "../entities/Custormer";

const customersRepository = dataSource.getRepository(Customer);
export default customersRepository;
