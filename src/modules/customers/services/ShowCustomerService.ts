import AppError from "../../../shared/errors/AppError";
import Customer from "../typeorm/entities/Custormer";
import customersRepository from "../typeorm/repositories/CurstomersRepository";

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await customersRepository.findOne({ where: { id: id } });

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    return customer;
  }
}

export default ShowCustomerService;
