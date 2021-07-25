import AppError from '../errors/AppError';
import { ReceiptsRepository } from '../repositories/ReceiptsRepository';

class DeleteReceiptService {
  async execute(id: string): Promise<void> {
    const receiptsRepository = new ReceiptsRepository();

    const receiptExist = await receiptsRepository.findById(id);

    if (!receiptExist) {
      throw new AppError('Receipt not found.');
    }

    await receiptsRepository.delete(id);
  }
}

export { DeleteReceiptService };
