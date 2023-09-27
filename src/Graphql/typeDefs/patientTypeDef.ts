import { gql } from "apollo-server"; //it will help u to create type definition

const PatientTypeDefs= gql`
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
export default PatientTypeDefs;
