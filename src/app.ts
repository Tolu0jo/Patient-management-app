import mongoose from "mongoose"
import dotenv from "dotenv"
import { ApolloServer } from 'apollo-server'
import {mergeTypeDefs,mergeResolvers} from "@graphql-tools/merge"
import DoctorTypeDefs from "./Graphql/typeDefs/doctorTypeDef"
import PatientTypeDefs from "./Graphql/typeDefs/patientTypeDef"
import DoctorResolver from "./Graphql/resolvers/doctor"
import PatientResolver from "./Graphql/resolvers/patient"
import jwt from"jsonwebtoken";
import { Request } from "express"
import { verifyToken } from "./utils"
import { idText } from "typescript"
import { GraphQLError } from "graphql"
const typeDefs = mergeTypeDefs([DoctorTypeDefs,PatientTypeDefs])
const resolvers = mergeResolvers([DoctorResolver,PatientResolver])

dotenv.config()


const server = new ApolloServer({
typeDefs,
resolvers,
  context: async ({ req }: { req: Request }) => {
  try {
    const isIntrospection = req.body?.operationName === 'IntrospectionQuery';

    if (isIntrospection) {
      return null; // Skip token verification for introspection
    }
    const token = req.headers.authorization?.split(" ")[1];
   
    if(!token) return new GraphQLError("No token provided");
    const user = await verifyToken(token);
   
    return user;
  } catch (error) {
    throw new GraphQLError("Invalid token"),{
      extensions:{code:"NOT_AUTHENTICATED"}
    }
  }
   
  },
  persistedQueries: false,
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
