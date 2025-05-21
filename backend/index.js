const { ApolloServer } = require("apollo-server");
const { connectToDb } = require("./config/db");
const { typeDefs, resolvers } = require("./graphql");

async function startServer() {
  await connectToDb();

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
