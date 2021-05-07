import { User } from '../models/User';

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
  private users: User[];

  constructor() {
    this.users = [];
  }

  all(): User[] {
    return this.users;
  }

  create({ name, email, password, cpf }: IUser): User {
    const user = new User(name, email, password, cpf);

    this.users.push(user);

    return user;
  }

  findUserByCPFandEmail({ cpf, email }: IFindUser): User | undefined {
    const user = this.users.find(
      (item) => item.cpf === cpf || item.email === email
    );

    return user;
  }
}

export { UsersRepository };
