import { Router } from "express";

const routes = Router();

routes.get('/', (req, res) => {
  return res.send('Server Online')
})

export default routes;