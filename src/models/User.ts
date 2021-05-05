import { v4 as uuidV4 } from 'uuid';

interface IItem {
  id: string;
  description: string;
  value: number;
  date: Date;
}

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  cpf: string;

  acconut_balance: number;

  incomes: Array<IItem>;

  outcomes: Array<IItem>;

  created_at: Date;

  updated_at: Date;

  constructor(name: string, email: string, password: string, cpf: string) {
    this.id = uuidV4();
    this.name = name;
    this.password = password;
    this.email = email;
    this.cpf = cpf;
    this.acconut_balance = 0;
    this.incomes = [];
    this.outcomes = [];
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { User };
