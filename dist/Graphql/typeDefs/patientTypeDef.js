"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server"); //it will help u to create type definition
const PatientTypeDefs = (0, apollo_server_1.gql) `
type Patient{
    id: ID!,
    patientName: String,
    age: Int,
    weight: String,
    height: String,
    bloodGroup: String,
    genotype: String,
    bloodPressure:String,
    HIV_status:String,
    hepatitis:String,
  }
type Message{
  message:String
}
input RegisterPatientInput
{
    patientName: String,
    age: Int,
    weight: String,
    height: String,
    bloodGroup: String,
    genotype: String,
    bloodPressure:String,
    HIV_status:String,
    hepatitis:String  
}
input UpdatePatientInput
{
    patientName: String,
    age: Int,
    weight: String,
    height: String,
    bloodGroup: String,
    genotype: String,
    bloodPressure:String,
    HIV_status:String,
    hepatitis:String 
}

  type Query {
    allPatients:[Patient]!
    eachPatient(id:ID!):Patient
  }
  type Mutation{
    RegisterPatient(RegisterPatientInput:RegisterPatientInput):Patient
    UpdatePatient(id:ID!,UpdatePatientInput:UpdatePatientInput):Message!
    DeletePatient(id:ID!) :Message!
  }
`;
exports.default = PatientTypeDefs;
