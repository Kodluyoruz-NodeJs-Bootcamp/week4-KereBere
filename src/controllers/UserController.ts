import { Request, Response } from 'express';
import { EntitySchema, getRepository, ObjectID } from 'typeorm';
import { User } from '../entity/User';
import { hash, compare } from 'bcryptjs';

class UserController {
  static listAll = async (user: EntitySchema) => {
    const userRepository = getRepository(user);
    const users = await userRepository.find({
      select: ['id', 'username'],
    });
  };

  static getOneByEmail = async (email: User) => {
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne({ where: { email: email } });
      if (user) return user;
      throw new Error('User does not exist');
    } catch (error) {
      throw new Error('Got no idea what just happened, user does not exist');
    }
  };

  static newUser = async (userBody: User) => {
    let { name, username, email, password } = userBody;
    let user = new User();
    try {
      user.name = name;
      user.username = username;
      user.email = email;
      user.password = await hash(password, 10);
      const userRepository = getRepository(User);
      await userRepository.save(user);
    } catch (e) {
      throw new Error('An error occured while saving user');
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

    // user.username = username;
    // user.role = role;
    // const errors = await validate(user);
    // if (errors.length > 0) {
    //   res.status(400).send(errors);
    //   return;
    // }

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
