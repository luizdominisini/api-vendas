import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

class ProductController {
  //Listar
  public async index(request: Request, response: Response): Promise<Response> {
    //Instanciar classe antes de usa-la;
    const list = new ListProductService();
    //Trata a Promise e espera retorna os produtos e guarda na variavel;
    const products = await list.execute();
    //returno um response em json dos products;
    return response.json(products);
  }

  //Mostrar produto específico;
  public async show(request: Request, response: Response): Promise<Response> {
    const show = new ShowProductService();
    const { id } = request.params;
    const product = await show.execute({ id });
    return response.json(product);
  }

  //Criar
  public async create(request: Request, response: Response): Promise<Response> {
    const create = new CreateProductService();
    const { name, price, quantity } = request.body;
    const product = await create.execute({ name, price, quantity });
    return response.json(product);
  }

  //Atualizar/Editar
  public async update(request: Request, response: Response): Promise<Response> {
    const update = new UpdateProductService();
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const product = await update.execute({ id, name, price, quantity });
    return response.json(product);
  }

  //Deletar
  public async remove(request: Request, response: Response): Promise<Response> {
    const remove = new DeleteProductService();
    const { id } = request.params;
    await remove.execute({ id });
    return response.json({ message: "Item apagado com sucesso." });
  }
}

export default ProductController;
