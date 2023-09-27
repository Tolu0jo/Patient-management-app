import mongoose, { Schema } from "mongoose";

interface DoctorAttributes{
    email: string;
    DoctorsName: string;
    password: string;
    phoneNumber: string;
    gender: string;
    specialization: string;
}

export interface DoctorRegister {
  CreateDoctorInput: DoctorAttributes
}

export interface UpdateDoctor{
  id:string,
  UpdateDoctorInput:DoctorAttributes
}
interface LoginData{
  email: string;
  password: string;
}
export interface Login{
LoginInput: LoginData
}



const DoctorSchema = new Schema(
    {
      email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
        required: true,
        unique: true,
      },
      DoctorsName: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
        unique:true,
      },
      gender: { 
      },
      specialization: {
        type: String,
        required: true,
      },
      token:{
        type:String
      }
    }
  );
  
  const Doctor = mongoose.model("Doctor", DoctorSchema);
  export default Doctor;