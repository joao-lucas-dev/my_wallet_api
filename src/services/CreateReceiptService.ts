import { Receipt } from '../entities/Receipt';
import AppError from '../errors/AppError';
import { ReceiptsRepository } from '../repositories/ReceiptsRepository';
import { UsersRepository } from '../repositories/UsersRepository';

interface IResquet {
  operation: string;
  value: number;
  user_id: string;
}

class CreateReceiptService {
  async execute({ operation, value, user_id }: IResquet): Promise<Receipt> {
    const usersRepository = new UsersRepository();
    const receiptsRepository = new ReceiptsRepository();

    const userExist = await usersRepository.findUserById(user_id);

    if (!userExist) {
      throw new AppError('User not found.');
    }

    const receipt = await receiptsRepository.create({
      operation,
      value,
      user_id
    });

    return receipt;
  }
}

export { CreateReceiptService };
