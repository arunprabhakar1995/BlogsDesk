const { ApolloServer } = require("apollo-server");
const { connectToDb } = require("./config/db");
const { typeDefs, resolvers } = require("./graphql");

async function startServer() {
  await connectToDb();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: ["http://localhost:3000", "https://blogs-desk.vercel.app"], // adjust as needed
      credentials: true,
    },
  });
  const PORT = process.env.PORT;
  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
