import { Router } from 'express';

import { CreateReceiptService } from '../services/CreateReceiptService';

const receiptsRoutes = Router();

receiptsRoutes.post('/', async (request, response) => {
  const { operation, value } = request.body;

  const createReceiptService = new CreateReceiptService();

  const receipt = await createReceiptService.execute({
    operation,
    value,
    user_id: request.user.id
  });

  return response.json(receipt);
});

export { receiptsRoutes };
