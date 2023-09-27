import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import Doctor  from "../Model/doctorModel"
import { AuthenticationError } from "apollo-server";


const jwtsecret = process.env.JWT_SECRET as string;

export const auth =(context: { req: { headers: { authorization: string; }; }; },next:NextFunction)=>{
  const authentication= context.req.headers.authorization
  if(authentication){
    const token = authentication.split("Bearer")[1]
    if(token){
      try {
        const verified = jwt.verify(token, jwtsecret);
        return verified;
       
      } catch (error) {
        throw new  AuthenticationError("Invalid/expired token")
      }
    };
    throw new Error("Provide Bearer token")
  }
  throw new Error("Athorization header must be provded")
}

