import { GraphQLClient } from "graphql-request";

const GRAPHCMS_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || "";
const HYGRAPH_MUTATION_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_MUTATION_TOKEN;
// const { GRAPHCMS_ENDPOINT = "", HYGRAPH_MUTATION_TOKEN = "" } = process.env;
const authorization = `Bearer ${HYGRAPH_MUTATION_TOKEN}`;

export default new GraphQLClient(GRAPHCMS_ENDPOINT, {
  headers: {
    ...(HYGRAPH_MUTATION_TOKEN && { authorization }),
  },
});
