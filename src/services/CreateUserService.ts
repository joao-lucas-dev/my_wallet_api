import AppError from '../errors/AppError';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface IResquet {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  execute({ name, email, password, cpf }: IResquet): User {
    const userExist = this.usersRepository.findUserByCPFandEmail({
      cpf,
      email
    });

    if (userExist) {
      throw new AppError('User already exist.');
    }

    const user = this.usersRepository.create({ name, email, password, cpf });

    return user;
  }
}

export { CreateUserService };
