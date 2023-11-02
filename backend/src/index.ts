import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import "dotenv/config";
import cors from "cors";
import express from "express";
import session from "express-session";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME } from "./constants";
import { UserResolver } from "./resolvers/user";
import { AppDataSource } from "./dataSource";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import bodyParser from "body-parser";
import { LichessResolver } from "./resolvers/lichess";

const main = async () => {
  const conn = await AppDataSource.initialize();
  conn.runMigrations();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, LichessResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await apolloServer.start();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
    session({
      name: COOKIE_NAME,
      cookie: {
        // 1 week
        maxAge: 604800000,
        httpOnly: true,
        sameSite: "lax",
      },
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
    }),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on localhost:${process.env.SERVER_PORT}`);
  });
};

main().catch((err) => console.log(err));
