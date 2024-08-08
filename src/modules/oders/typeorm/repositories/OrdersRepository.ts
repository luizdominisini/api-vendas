import dataSource from "../../../../shared/typeorm";
import Order from "../entities/Order";

const OrdersRepository = dataSource.getRepository(Order);
export default OrdersRepository;
