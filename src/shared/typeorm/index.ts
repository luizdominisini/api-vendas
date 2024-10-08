import { DataSource } from "typeorm";
import Product from "../../modules/products/typeorm/entities/Product";
import User from "../../modules/users/typeorm/entities/User";
import UserToken from "../../modules/users/typeorm/entities/UserToken";
import Customer from "../../modules/customers/typeorm/entities/Custormer";
import Order from "../../modules/oders/typeorm/entities/Order";
import OrdersProducts from "../../modules/oders/typeorm/entities/OrdersProducts";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
  entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
  migrationsTableName: "migrations",
});

export default dataSource;
