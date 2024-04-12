import { ApolloServer, gql } from "apollo-server-micro";
import "crypto";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const typeDefs = gql`
  scalar JSON
`;

const resolvers = {
  Query: {},
  Mutation: {},
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(
  req: MicroRequest,
  res: ServerResponse<IncomingMessage>
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
