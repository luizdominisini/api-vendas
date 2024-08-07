import AppError from "../../../shared/errors/AppError";
import Customer from "../typeorm/entities/Custormer";
import customersRepository from "../typeorm/repositories/CurstomersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await customersRepository.findOne({ where: { id: id } });

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    const customerExists = await customersRepository.findOneBy({ email });

    if (customerExists && customer.email !== email) {
      throw new AppError("This email adress already exists.");
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
