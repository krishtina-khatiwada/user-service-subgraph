import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import 'dotenv/config';
import typeDefs from "./schema/schema.js";
import { db } from "./db.js";
import { users } from "./drizzle/schema.js";
import { eq, and } from "drizzle-orm";

const resolvers = {
  Query: {
    login: async ( _: any,{ username, password }: { username: string; password: string },
      context: { db: typeof db }) => {
      const user = await context.db
        .select()
        .from(users)
        .where(
          and(
            eq(users.username, username),
            eq(users.password, password)
          )
        );

      if (user.length === 0) {
        throw new Error("user not found");
      }
      return user[0];
    },
  },

  Mutation:{
      adduser: async(_:any,{username,password}:{ username: string; password: string },
        context:{db:typeof db}
      )=>{
         const result = await context.db
      .insert(users)
      .values({
        username,
        password,
      });
        const insertedUser = await context.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
        return insertedUser[0];
    }
    
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    db,
  }),
});

console.log(`🚀 Server ready at ${url}`);
