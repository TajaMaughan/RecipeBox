const { buildSchema } = require('graphql');

module.exports = buildSchema (`
type User {
  id: ID!
  userName: String!
  email: String!
  password: String!
  recipes: [Recipe!]
}

type AuthData {
  userId: String!
  token: String!
}

type Recipe {
    id: ID!
    title: String!
    url: String!
    tags: String!
    createdAt: String!
    updatedAt: String!
  }

  type RecipeBox {
    recipes: [Recipe]
  }

  input CreateUserInputData {
    userName: String!
    email: String!
    password: String!
  }

  input RecipeInputData{
    title: String!
    url: String!
    tags: String!
  }

  type RootQuery {
    userLogin(email: String!, password: String!): AuthData!
    getRecipe(id: ID!): Recipe!
    getRecipes: RecipeBox!
  }

  type RootMutation {
    createUser(userInput: CreateUserInputData): User!
    postRecipe(recipeInput: RecipeInputData): Recipe!
    updateRecipe(id: ID!, recipeInput: RecipeInputData): Recipe!
    deleteRecipe(id: ID!): Boolean
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)