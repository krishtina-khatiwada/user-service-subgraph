import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import {gql} from 'graphql-tag';
const typeDefs= gql` 
type users @key (fields:"id"){
    id:ID!
    username:String!
    password:Int!
}
extend type Task @key(fields: "id") {
  id: ID! @external
}

type Query{
    login(username:String!, password:Int!): users
}
type Mutation{
    adduser(username:String!, password:Int!):users
}
`
export default typeDefs;