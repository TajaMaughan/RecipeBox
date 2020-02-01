const { buildSchema } = require('graphql');

module.exports = buildSchema (`
  type Recipe {
    id: String
    title: String
  }

  type RecipeBox {
    recipes: [Recipe]
  }

  input PostInputData{
    title: String!
  }

  type RootQuery {
    recipe: Recipe!
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