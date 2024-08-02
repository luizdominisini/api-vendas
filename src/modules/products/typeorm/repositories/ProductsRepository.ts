import dataSource from "../../../../shared/typeorm";
import { Product } from "../entities/Product";

export const ProductRepository = dataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.createQueryBuilder("products")
      .where("user.name = :name", {
        name,
      })
      .getMany();
  },
});
