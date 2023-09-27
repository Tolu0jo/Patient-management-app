"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server"); //it will help u to create type definition
const typeDefs = (0, apollo_server_1.gql) `
type Doctor{
    id: ID!,
    email: String,
    DoctorsName: String,
    password: String,
    phoneNumber: String,
    gender: String,
    specialization: String,
    token:String
  }
input CreateDoctorInput
{
    email: String!,
    DoctorsName: String!,
    password: String!,
    phoneNumber: String!,
    gender: String!,
    specialization: String!,  
}
input UpdateDoctorInput
{
    email: String,
    DoctorsName: String,
    password: String,
    phoneNumber: String,
    gender: String,
    specialization: String,  
}
 input LoginInput{
  email: String!,
  password: String!
}
  type Query {
    allDoctors:[Doctor]!
    eachDoctor(id:ID!):Doctor
  }
  type Mutation{
    CreateDoctor(CreateDoctorInput:CreateDoctorInput):Doctor
    LoginDoctor(LoginInput:LoginInput):Doctor
    UpdateDoctor(id:ID!,UpdateDoctorInput:UpdateDoctorInput):Boolean!
    DeleteDoctor(id:ID!) :Boolean!
  }
`;
exports.default = typeDefs;
