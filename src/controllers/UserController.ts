import { Request, Response } from 'express';
import { EntitySchema, getRepository, ObjectID } from 'typeorm';
import { User } from '../entity/User';
import { hash, compare } from 'bcryptjs';

export class UserController {
  static listAll = async (user: EntitySchema) => {
    const userRepository = getRepository(user);
    const users = await userRepository.find({
      select: ['id', 'username'],
    });
  };

  static getOneByEmail = async (email: string, password: string) => {
    try {
      const user = await User.findOneOrFail({ where: { email: email } });
      compare(password, user.password, (err, same) => {
        console.log(same);
        if (same) {
          return user;
        } else {
          throw 'Wrong password-UserController';
        }
      });
    } catch (error) {
      throw new Error('Got no idea what just happened, user does not exist');
    }
  };

  static newUser = async (userBody: User) => {
    let { name, username, email, password } = userBody;
    let user = new User();
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = await hash(password, 10);
    try {
      await User.save(user);
    } catch (e) {
      throw new Error('An error occured while saving user.');
    }
  };

  static editUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { username, role } = req.body;

    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }
    res.status(204).send('User edited successfully');
  };

  static deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    const userRepository = getRepository(User);
    try {
      await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    userRepository.delete(id);
    res.status(204).send();
  };
}

export default UserController;
