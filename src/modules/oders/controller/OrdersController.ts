import { Request, Response } from "express";
import ShowOrderService from "../service/ShowOrderService";
import CreateOrderService from "../service/CreateOrderService";

class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ id });
    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = new CreateOrderService();
    const { customer_id, products } = request.body;
    const order = await createOrder.execute({ customer_id, products });
    return response.json(order);
  }
}

export default OrdersController;
