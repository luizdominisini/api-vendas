import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
  migrationsTableName: "migrations",
});

export default dataSource;
