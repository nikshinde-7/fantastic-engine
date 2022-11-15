import { AuthenticationError } from 'apollo-server-errors';
import {
  createUser,
  getUsers,
  loginUser,
} from '../controllers/user.controller';
import { ICreateUser, ILogin } from '../interfaces/User';

const userTypeDef = `
type User {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String
}
extend type Query {
    users: [User]
}
extend type Mutation {
    createUser(  firstName:String!,
      lastName:String!,
      email:String!,
      phoneNumber:String!,
      password:String!): AuthPayLoad!
    login(   email: String!,
      password: String!): AuthPayLoad!
}

input UserCreateInput {
  firstName:String!
  lastName:String!
  email:String!
  phoneNumber:String!
  password:String!
  }
  input UserLoginInput {
    email: String!
    password: String!
  }
  type AuthPayLoad {
    token: String!
  }
`;

const userResolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      return await getUsers();
    },
  },
  Mutation: {
    createUser: async (parent: any, args: ICreateUser) => {
      return createUser(args);
    },
    login: async (parent: any, args: ILogin) => {
      return loginUser(args);
    },
  },
};

export { userTypeDef, userResolvers };
