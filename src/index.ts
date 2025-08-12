import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema/schema.js";
import 'dotenv/config';
import {db} from './db.js'
import { users } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { startStandaloneServer } from "@apollo/server/standalone";
const resolvers={
    Query:{
    login: async (_:any,{username,password}:{username:string, password:string},context:{db:any})=> {
        const user= await db.select().from(users)
        .where(
            and(
                eq(users.username, username),
                eq(users.password,password)))
    if (user.length==0){
        throw new Error ('user not found');
    }
    return user[0];
    }

}
}
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const {url}= await startStandaloneServer(server,{
    listen: {port:4000}
});
console.log(`server ready at: ${url} `);