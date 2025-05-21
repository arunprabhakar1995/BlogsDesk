const { gql } = require("apollo-server");

const blogTypeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    content: String!
    author: String!
  }

  type Query {
    getAllBlogs: [Blog!]!
    getBlogById(id: ID!): Blog
  }

  type Mutation {
    createBlog(title: String!, content: String!, author: String!): Blog!
    updateBlog(id: ID!, title: String!, content: String!, author: String!): Blog!
    deleteBlog(id: ID!): Boolean!
  }
`;

module.exports = blogTypeDefs;
