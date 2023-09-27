import { gql } from "apollo-server"; 

const DoctorTypeDefs = gql`
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
    DeleteDoctor(id:ID!):Boolean!
  }
`;
export default DoctorTypeDefs;
