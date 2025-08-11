import { ApolloServer } from "@apollo/server";
import typedefs from "./schema/schema";
import { buildSubgraphSchema } from "@apollo/subgraph";
import 'dotenv/config';
import {db} from './db.js'
import { users } from "./drizzle/schema";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { error } from "console";
const resolvers={
    Query:{
    login: async (_:any,{username,password}:{username:string, password:string})=> {
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