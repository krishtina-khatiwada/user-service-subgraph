import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import {gql} from 'graphql-tag';
const typeDefs= gql` 
type users @key (fields:"id"){
    id:ID!
    username:String!
    password:Int!
}
type task @key(fields:id){
    id:ID!
    title:String!
}
type Query{
    login(username:String!, password:Int!): [Task]
}
`
export default typeDefs;