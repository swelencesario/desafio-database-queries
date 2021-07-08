import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const userById = await this.repository.findOneOrFail(user_id, { relations: ['games']});

    return userById;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const user = await this.repository.query(`SELECT * FROM users ORDER BY first_name`); // Complete usando raw query

    return user;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository.query(`SELECT * FROM users AS u WHERE LOWER(u.first_name) = LOWER($1) AND LOWER(u.last_name) = LOWER($2)`, [first_name, last_name]); // Complete usando raw quer

    return users;
  }
}
