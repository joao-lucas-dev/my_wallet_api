import { Router } from 'express';

import { UsersRepository } from '../repositories/UsersRepository';
import { CreateUserService } from '../services/CreateUserService';

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.get('/', (req, res) => {
  const users = usersRepository.all();

  return res.json(users);
});

usersRoutes.post('/', (req, res) => {
  const { name, email, password, cpf } = req.body;

  const createUserService = new CreateUserService(usersRepository);

  const user = createUserService.execute({ name, email, password, cpf });

  return res.json(user);
});

export { usersRoutes };
