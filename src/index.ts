import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import { dataSource } from "./client";

import {
  getCartoons,
  getOneCartoonsById,
  createCartoon,
  deleteCartoon,
} from "./resolvers/cartoons.resolver";
import {
  typeDef as Cartoon,
  inputDef as CartoonInput,
} from "./schema/cartoons.schema";
import {
  typeDef as Personnage,
  inputDef as PersonnageInput,
} from "./schema/personnages.schema";

import {
  typeDef as Genre,
  inputDef as GenreInput,
} from "./schema/genres.schema";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Cartoon" type defines the queryable fields for every cartoon in our data source.
  type Cartoon ${Cartoon}
  type Personnage ${Personnage}
  type Genre ${Genre}

  input PersonnageInput ${PersonnageInput}
  input CartoonInput ${CartoonInput}
  input GenreInput ${GenreInput}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "cartoons" query returns an array of zero or more Cartoons (defined above).
  type Query {
    getCartoons: [Cartoon],
    getOneCartoonsById(id: ID!): Cartoon,
  }

  type Mutation {
    createCartoon(cartoon: CartoonInput): Int,
    deleteCartoon(id: ID!): Boolean
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getCartoons,
    getOneCartoonsById,
  },
  Mutation: {
    createCartoon,
    deleteCartoon,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
(async () => {
  await dataSource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
