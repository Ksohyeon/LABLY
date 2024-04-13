import { GraphQLClient } from "graphql-request";

const { GRAPHCMS_ENDPOINT = "", HYGRAPH_MUTATION_TOKEN = null } = process.env;
const authorization = `Bearer ${HYGRAPH_MUTATION_TOKEN}`;

export default new GraphQLClient(GRAPHCMS_ENDPOINT, {
  headers: {
    ...(HYGRAPH_MUTATION_TOKEN && { authorization }),
  },
});
