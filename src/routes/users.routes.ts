import { Router } from 'express';

import { CreateUserService } from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', (req, res) => {
  const { name, email, password, cpf } = req.body;

  const createUserService = new CreateUserService();

  const user = createUserService.execute({ name, email, password, cpf });

  return res.json(user);
});

export { usersRoutes };
