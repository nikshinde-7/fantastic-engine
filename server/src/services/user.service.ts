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

const deleteUserById = (id: number) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

const deleteUserWithEmail = (email: string) => {
  return prisma.user.delete({
    where: {
      email,
    },
  });
};

export {
  fetchAllUsers,
  createNewUser,
  findByEmail,
  deleteUserById,
  deleteUserWithEmail,
};