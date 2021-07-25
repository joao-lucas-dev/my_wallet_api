import { getRepository, Repository } from 'typeorm';

import { Receipt } from '../entities/Receipt';

interface IReceipt {
  operation: string;
  value: number;
  user_id: string;
}

class ReceiptsRepository {
  private repository: Repository<Receipt>;

  constructor() {
    this.repository = getRepository(Receipt);
  }

  async create({ operation, value, user_id }: IReceipt): Promise<Receipt> {
    const receipt = this.repository.create({ operation, value, user_id });

    await this.repository.save(receipt);

    return receipt;
  }
}

export { ReceiptsRepository };
