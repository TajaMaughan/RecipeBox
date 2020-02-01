const { buildSchema } = require('graphql');

module.exports = buildSchema (`
  type Recipe {
    id: ID!
    title: String!
    url: String!
    tags: String!
  }

  type RecipeBox {
    recipes: [Recipe]
  }

  input PostInputData{
    title: String!
    url: String!
    tags: String!
  }

  type RootQuery {
    recipe(id: ID!): Recipe!
    recipes: RecipeBox!
  }

  type RootMutation {
    postRecipe(postInput: PostInputData): Recipe!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)