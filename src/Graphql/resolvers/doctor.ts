import Doctor, { DoctorRegister, Login, UpdateDoctor } from "../../Model/doctorModel";
import { ApolloError, AuthenticationError } from "apollo-server";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const newl = ()=>{
  console.log("object")
}
const secret = process.env.JWT_SECRET as string;

const DoctorResolver = {
  Query: {
    allDoctors: async ( req:Request) => {
      try {
        console.log(req)
        const doctors = await Doctor.find();
        return doctors;
      } catch (error) {
        console.log(error);
      }
    },
    eachDoctor: async (_: unknown, { id }: UpdateDoctor) => {
      try {
        const doctor = await Doctor.findById(id);
        return doctor;
      } catch (error) {
        console.log(error);
      }
    },
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

        const token = jwt.sign({ doctorId: newDoctor._id }, secret, {
          expiresIn: "2h",
        });

        newDoctor.token = token;
        const doctor = await newDoctor.save();

        return doctor;
      } catch (error) {
        console.log(error);
      }
    },
    LoginDoctor: async (
      _: unknown,
      { LoginInput: { email, password } }: Login
    ) => {
      const validDoctor = await Doctor.findOne({ email });
      const validPassword = await bcrypt.compare(
        password,
        validDoctor?.password || ""
      );
      if (validDoctor && validPassword) {
        const token = jwt.sign({ doctorId: validDoctor._id }, secret, {
          expiresIn: "2h",
        });
        validDoctor.token = token;
        return validDoctor;
      } else {
        throw new ApolloError("Invalid Credentials", "INVALID_CREDENTIALS");
      }
    },
    UpdateDoctor: async (
      _: unknown,
      {
        id,
        UpdateDoctorInput: {
          email,
          DoctorsName,
          password,
          phoneNumber,
          gender,
          specialization,
        },
      }: UpdateDoctor
    ) => {
      try {
        const genSalt = 10;

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

    DeleteDoctor: async (_: unknown, { id }: UpdateDoctor) => {
      try {
        const doctor = await Doctor.deleteOne({ _id: id });
        return doctor.deletedCount;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default DoctorResolver;
