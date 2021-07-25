import { getRepository, Repository } from 'typeorm';

import { Receipt } from '../entities/Receipt';

interface IReceipt {
  operation: string;
  value: number;
  user_id?: string;
  id?: string;
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

  findById(id: string): Promise<Receipt | undefined> {
    const receipt = this.repository.findOne({
      where: { id }
    });

    return receipt;
  }

  async update({ operation, value, id }: IReceipt): Promise<void> {
    await this.repository.update({ id }, { operation, value });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { ReceiptsRepository };
