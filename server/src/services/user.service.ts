import prisma from '../../prisma';
import { ICreateUser } from '../interfaces/User';

const fetchAllUsers = () => {
  return prisma.user.findMany();
};

const createNewUser = (userData: ICreateUser) => {
  return prisma.user.create({
    data: userData,
  });
};

const findByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export { fetchAllUsers, createNewUser, findByEmail };
