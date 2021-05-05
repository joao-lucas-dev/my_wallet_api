import { User } from '../models/User';

interface IUser {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create({ name, email, password, cpf }: IUser): User {
    const user = new User(name, email, password, cpf);

    this.users.push(user);

    return user;
  }
}

export { UsersRepository };
