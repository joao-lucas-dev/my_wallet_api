import { getRepository, Repository } from 'typeorm';

import { Receipt } from '../entities/Receipt';

interface IReceipt {
  operation: string;
  value: number;
  user_id?: string;
  id?: string;
}

interface IGetReceipts {
  user_id: string;
  skip: any;
  limit: any;
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

  async getAccountBalance(user_id: string): Promise<number> {
    const receipts = await this.repository.find({
      user_id
    });

    const accountBalance = receipts.reduce((acc, item) => {
      return item.operation === 'income' ? acc + item.value : acc - item.value;
    }, 0);

    return accountBalance;
  }

  async getAllReceipts({
    user_id,
    skip,
    limit
  }: IGetReceipts): Promise<Receipt[]> {
    const receipts = await this.repository.find({
      where: { user_id },
      skip,
      take: limit
    });

    return receipts;
  }
}

export { ReceiptsRepository };
