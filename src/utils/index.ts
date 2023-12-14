import {verify,sign} from "jsonwebtoken"
import Doctor from "../Model/doctorModel";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET as string

export const createToken=async(id:string)=>{
return sign({id},secret,{expiresIn:"1d"})
}

export const verifyToken= async(token:string)=>{
   
    try {
        const valid:any =verify(token,secret);
        const {id}=valid
        return await Doctor.findById(id);
    } catch (error) {
        console.log(error)
    }

}

