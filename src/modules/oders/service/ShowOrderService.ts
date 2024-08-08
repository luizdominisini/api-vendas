import AppError from "../../../shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const order = await OrdersRepository.findOneBy({ id });
    if (!order) {
      throw new AppError("Order not found");
    }
    console.log(order);
    return order;
  }
}
export default ShowOrderService;
