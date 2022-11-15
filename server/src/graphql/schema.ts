import { merge } from 'lodash';
import { gql } from 'apollo-server';
import { userTypeDef, userResolvers } from './user';

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  `;

let resolvers = {};

const typeDefs = gql(`${Query}${userTypeDef}`);

resolvers = merge(resolvers, userResolvers);

export { typeDefs, resolvers };
