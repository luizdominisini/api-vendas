import AppError from "../../../shared/errors/AppError";
import customersRepository from "../typeorm/repositories/CurstomersRepository";

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await customersRepository.findOne({ where: { id: id } });

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
