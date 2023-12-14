import Doctor, { DoctorRegister, Login, UpdateDoctor } from "../../Model/doctorModel";
import { ApolloError, AuthenticationError } from "apollo-server";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createToken } from "../../utils";
import { GraphQLError } from "graphql";
dotenv.config();

const DoctorResolver = {
  Query: {
    allDoctors: async () => {
      try {
      
        const doctors = await Doctor.find();
        return doctors;
      } catch (error) {
        console.log(error);
      }
    },
    eachDoctor: async (_: unknown, { id }: UpdateDoctor,context:any) => {
      try {
        const doctor = await Doctor.findById(id);
        return doctor;
      } catch (error) {
        console.log(error);
      }
    },
  me:async(_:unknown,__:unknown,context:any)=>{
    const {id}=context;

    const doctor = await Doctor.findById(id);
    return doctor;
  }
  },

  Mutation: {
    CreateDoctor: async (
      _: any,

      {
        CreateDoctorInput: {
          email,
          DoctorsName,
          password,
          phoneNumber,
          gender,
          specialization,
        },
      }: DoctorRegister
    ) => {
      try {
        const existingDoctor = await Doctor.findOne({ email });

        if (existingDoctor) {
          throw new ApolloError(
            "Doctor already exists with this " + email,
            "USER_ALREADY_EXISTS"
          );
        }
        const genSalt = 10;

        const encryptedPassword = await bcrypt.hash(password, genSalt);

        const newDoctor = new Doctor({
          email: email.toLowerCase(),
          DoctorsName: DoctorsName,
          password: encryptedPassword,
          phoneNumber: phoneNumber,
          gender: gender,
          specialization: specialization,
        });

        

        const token = await createToken(newDoctor._id as unknown as string)
        const doctor = await newDoctor.save();
      
        return {doctor,token};
      } catch (error) {
        
        throw new GraphQLError(`${error}`);
      }
    },
    LoginDoctor: async (
      _: unknown,
      { LoginInput: { email, password } }:Login
    ) => {
      const validDoctor = await Doctor.findOne({ email });
      if(!validDoctor) throw new ApolloError("Invalid Credentials", "INVALID_CREDENTIALS");
      const validPassword = await bcrypt.compare(
        password,
        validDoctor.password 
      );
      if (validDoctor && validPassword) {
        const token = await createToken(validDoctor._id as unknown as string)
        return {validDoctor,token};
      } else {
        throw new ApolloError("Invalid Credentials", "INVALID_CREDENTIALS");
      }
    },
    UpdateDoctor: async (
      _: unknown,
      {
        UpdateDoctorInput: {
          email,
          DoctorsName,
          password,
          phoneNumber,
          gender,
          specialization,
        },
      }: UpdateDoctor,
      context:any
    ) => {
      try {
        const genSalt = 10;
        const {id}=context;
        const encryptedPassword = await bcrypt.hash(password, genSalt);
        const updatedDoctor = await Doctor.updateOne(
          { _id: id },
          {
            email: email,
            DoctorsName: DoctorsName,
            password: encryptedPassword,
            phoneNumber: phoneNumber,
            gender: gender,
            specialization: specialization,
          }
        );
        return updatedDoctor.modifiedCount;
      } catch (error) {
        console.log(error);
      }
    },

    DeleteDoctor: async (_: unknown, __:unknown,context:any) => {
      try {
        const{id}=context;
        const doctor = await Doctor.deleteOne({ _id: id });
        return doctor.deletedCount;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default DoctorResolver;
