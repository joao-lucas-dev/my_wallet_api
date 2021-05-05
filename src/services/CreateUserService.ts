import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface IResquet {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

class CreateUserService {
  execute({ name, email, password, cpf }: IResquet): User {
    const usersRepository = new UsersRepository();

    const user = usersRepository.create({ name, email, password, cpf });

    return user;
  }
}

export { CreateUserService };
