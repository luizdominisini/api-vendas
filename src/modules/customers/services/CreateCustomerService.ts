import AppError from "../../../shared/errors/AppError";
import Customer from "../typeorm/entities/Custormer";
import customersRepository from "../typeorm/repositories/CurstomersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const emailExists = await customersRepository.findOneBy({ email });

    if (emailExists) {
      throw new AppError("This email adress already exists.");
    }

    const customer = customersRepository.create({ name, email });
    await customersRepository.save(customer);
    return customer;
  }
}

export default CreateCustomerService;
