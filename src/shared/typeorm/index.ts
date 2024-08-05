import { DataSource } from "typeorm";
import Product from "../../modules/products/typeorm/entities/Product";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
  entities: [Product],
  migrationsTableName: "migrations",
});

export default dataSource;
