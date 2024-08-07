import { Request, Response } from "express";
import ListCustomerService from "../services/ListCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleCustomerService";

class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomer = new ListCustomerService();
    const customers = await listCustomer.execute();
    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showCustomer = new ShowCustomerService();
    const { id } = request.params;
    const customer = await showCustomer.execute({ id });
    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const create = new CreateCustomerService();
    const { name, email } = request.body;
    const customer = await create.execute({ name, email });
    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCustomer = new UpdateCustomerService();
    const { id } = request.params;
    const { name, email } = request.body;
    const customer = await updateCustomer.execute({ id, name, email });
    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCustomer = new DeleteCustomerService();
    const { id } = request.params;
    await deleteCustomer.execute({ id });
    return response.json([]);
  }
}

export default CustomerController;
