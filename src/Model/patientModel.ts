import mongoose, { Schema } from "mongoose";


interface PatientAttributes {
  doctorId: string;
  patientName: string;
  age: number;
  weight: string;
  height: string;
  bloodGroup: string;
  genotype: string;
  bloodPressure: string;
  HIV_status: string;
  hepatitis: string; 
}
export interface PatientRegister {
  RegisterPatientInput: PatientAttributes
}

export interface UpdatePatient{
  id:string,
  UpdatePatientInput:PatientAttributes
}



const PatientSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    genotype: {
      type: String,
      required: true,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    HIV_status: {
      type: String,
      required: true,
    },
    hepatitis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        (ret.patientId = ret._id),
          delete ret._id,
          delete ret.password,
          delete ret.__v;
      },
    },
  }
);
const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;