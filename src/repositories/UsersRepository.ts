import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

interface IUser {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

interface IFindUser {
  cpf: string;
  email: string;
}

class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password, cpf }: IUser): Promise<User> {
    const user = this.repository.create({ name, email, password, cpf });

    await this.repository.save(user);

    return user;
  }

  findUserByCPFandEmail({ cpf, email }: IFindUser): Promise<User | undefined> {
    const user = this.repository.findOne({
      where: [{ email }, { cpf }]
    });

    return user;
  }
}

export { UsersRepository };
