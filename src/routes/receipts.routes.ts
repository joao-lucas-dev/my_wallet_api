import { Router } from 'express';

import { CreateReceiptService } from '../services/CreateReceiptService';
import { DeleteReceiptService } from '../services/DeleteReceiptService';
import { UpdateReceiptService } from '../services/UpdateReceiptService';

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

receiptsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { operation, value } = request.body;

  const updateReceiptService = new UpdateReceiptService();

  await updateReceiptService.execute({
    operation,
    value,
    id
  });

  return response.send();
});

receiptsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteReceiptService = new DeleteReceiptService();

  await deleteReceiptService.execute(id);

  return response.send();
});

export { receiptsRoutes };
