import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { ReceiptsRepository } from '../repositories/ReceiptsRepository';
import { CreateUserService } from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async (req, res) => {
  const { name, email, password, cpf } = req.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
    cpf
  });

  return res.json(user);
});

usersRoutes.use(ensureAuthenticated);

usersRoutes.get('/:user_id/receipts', async (request, response) => {
  const { user_id } = request.params;
  const { skip, limit } = request.query;

  const receiptsRepository = new ReceiptsRepository();

  const accountBalance = await receiptsRepository.getAccountBalance(user_id);

  const receipts = await receiptsRepository.getAllReceipts({
    user_id,
    skip,
    limit
  });

  return response.json({ accountBalance, receipts });
});

export { usersRoutes };
