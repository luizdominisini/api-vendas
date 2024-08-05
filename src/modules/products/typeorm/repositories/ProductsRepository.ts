import dataSource from "../../../../shared/typeorm";
import Product from "../entities/Product";

const ProductRepository = dataSource.getRepository(Product);
export default ProductRepository;
