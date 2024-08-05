import { DataSource } from "typeorm";
import Product from "../../modules/products/typeorm/entities/Product";
import User from "../../modules/users/typeorm/entities/User";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
  entities: [Product, User],
  migrationsTableName: "migrations",
});

export default dataSource;
