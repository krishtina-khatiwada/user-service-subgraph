import { ApolloServer } from "@apollo/server";
import {gql} from 'graphql-tag';
const typedefs= gql` 
type users @key (fields:"id"){
    id:ID!
    username:String!
    password:Int!
}
type Query{
    login(username:String!, password:Int!): [Task]
}
`
export default typedefs;