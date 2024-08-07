import Customer from "../typeorm/entities/Custormer";
import customersRepository from "../typeorm/repositories/CurstomersRepository";

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const listCustomer = customersRepository.find();
    return listCustomer;
  }
}

export default ListCustomerService;
