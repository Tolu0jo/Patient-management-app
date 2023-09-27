import mongoose from "mongoose"
import dotenv from "dotenv"
import { ApolloServer } from 'apollo-server'
import {mergeTypeDefs,mergeResolvers} from "@graphql-tools/merge"
import DoctorTypeDefs from "./Graphql/typeDefs/doctorTypeDef"
import PatientTypeDefs from "./Graphql/typeDefs/patientTypeDef"
import DoctorResolver from "./Graphql/resolvers/doctor"
import PatientResolver from "./Graphql/resolvers/patient"
import jwt from"jsonwebtoken";
const typeDefs = mergeTypeDefs([DoctorTypeDefs,PatientTypeDefs])
const resolvers = mergeResolvers([DoctorResolver,PatientResolver])

dotenv.config()
const secret = process.env.JWT_SECRET as string;

const server = new ApolloServer({
typeDefs,
resolvers,
  context: ({ req }) => {{req};
  },
});


mongoose.connect(process.env.DATABASE_URL!)
  .then(() => {
    console.log("Database Connected Successfully")
  })
  .catch((error) => {
    console.log("Error connecting to database:", error.message)
  })




const port = 4000

server.listen(port,()=>{
    console.log(`Server listening at ${port} ...`)
})
