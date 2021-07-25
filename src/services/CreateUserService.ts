import { hash } from 'bcryptjs';

import { User } from '../entities/User';
import AppError from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

interface IResquet {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

class CreateUserService {
  async execute({ name, email, password, cpf }: IResquet): Promise<User> {
    const usersRepository = new UsersRepository();

    const userExist = await usersRepository.findUserByCPFandEmail({
      cpf,
      email
    });

    if (userExist) {
      throw new AppError('User already exist.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf
    });

    return user;
  }
}

export { CreateUserService };
