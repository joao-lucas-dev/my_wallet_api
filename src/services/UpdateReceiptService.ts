import AppError from '../errors/AppError';
import { ReceiptsRepository } from '../repositories/ReceiptsRepository';

interface IResquet {
  operation: string;
  value: number;
  id: string;
}

class UpdateReceiptService {
  async execute({ operation, value, id }: IResquet): Promise<void> {
    const receiptsRepository = new ReceiptsRepository();

    const receiptExist = await receiptsRepository.findById(id);

    if (!receiptExist) {
      throw new AppError('Receipt not found.');
    }

    await receiptsRepository.update({
      operation,
      value,
      id
    });
  }
}

export { UpdateReceiptService };
