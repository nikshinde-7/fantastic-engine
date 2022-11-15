import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';

import { JWT_SECRET } from '../config';

import * as jwt from 'jsonwebtoken';

import {
  fetchAllUsers,
  findByEmail,
  createNewUser,
} from '../services/user.service';
import { ICreateUser, ILogin, IUser } from '../interfaces/User';

async function getUsers() {
  return await fetchAllUsers();
}

async function createUser(userData: ICreateUser) {
  const user = await findByEmail(userData.email);
  if (user) {
    throw new UserInputError('Email exists', {
      argumentName: 'email',
    });
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  const newUser = await createNewUser({
    ...userData,
    password: hashedPassword,
  });
  return {
    token: jwt.sign(newUser, JWT_SECRET, {
      expiresIn: '1d',
    }),
  };
}

async function loginUser(userData: ILogin) {
  const user = await findByEmail(userData.email);
  if (!user) {
    throw new AuthenticationError('User not found');
  }
  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) throw new AuthenticationError('Password is incorrect');
  return {
    token: jwt.sign(user, JWT_SECRET, {
      expiresIn: '1d',
    }),
  };
}

async function getUserByToken(token: string) {
  if (!token) return null;
  const user = jwt.verify(token, JWT_SECRET) as IUser;
  return user;
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       token,
  //     },
  //   });
  //   return user;
  // }
}

export { getUsers, createUser, loginUser, getUserByToken };
