import Patient, { PatientRegister, UpdatePatient } from "../../Model/patientModel";
import jwt from "jsonwebtoken"
const secret = process.env.JWT_SECRET as string;



const PatientResolver = {
  Query: {
    allPatients: async (_:unknown,__:unknown,context:any) => {
   
      try {
    
      console.log(context)
       

        const patients = await Patient.find();
        return patients;
      } catch (error) {
        console.log(error);
      }
    },
    eachPatient: async (_: unknown, { id }: UpdatePatient) => {
      try {
        const patient = await Patient.findById(id);
        return patient;
      } catch (error) {
        console.log(error);
      }
   
    },
    myPatients:async(_:unknown,__:unknown,context:any)=>{
     const {id} = context
     const patients = await Patient.find({doctorId:id})
     return patients;
    }
  },
  Mutation: {
    RegisterPatient: async (
      _: unknown,
      {
        RegisterPatientInput: {
          age,
          patientName,
          weight,
          height,
          bloodGroup,
          genotype,
          bloodPressure,
          HIV_status,
          hepatitis,
        },
        
      }: PatientRegister
      ,context:any
    ) => {
      try {
        const newPatient = new Patient({
          patientName: patientName,
          age: age,
          weight: weight,
          doctorId:context.id,
          height: height,
          bloodGroup: bloodGroup,
          genotype: genotype,
          bloodPressure: bloodPressure,
          HIV_status: HIV_status,
          hepatitis: hepatitis,
        });

        const patient = await newPatient.save();

        return patient;
      } catch (error) {
        console.log(error);
      }
    },

    UpdatePatient: async (
      _: unknown,
      {
        id,
        UpdatePatientInput: {
          age,
          patientName,
          weight,
          height,
          bloodGroup,
          genotype,
          bloodPressure,
          HIV_status,
          hepatitis,
        },
      }: UpdatePatient,
      context:any
      
    ) => {
      try {
        const doctorId=context.id
        const message = {message:"Patient Updated Successfully"}
        await Patient.updateOne(
          { _id: id,doctorId },
          {
            patientName: patientName,
            age: age,
            weight: weight,
            height: height,
            bloodGroup: bloodGroup,
            genotype: genotype,
            doctorId,
            bloodPressure: bloodPressure,
            HIV_status: HIV_status,
            hepatitis: hepatitis,
          }
        );
        return message 
      } catch (error) {
        console.log(error);
      }
    },
    DeletePatient: async (_: unknown, { id }: UpdatePatient,context:any) => {
      try {
        const doctorId = context.id
        const message = {message:"Patient Deleted Successfully"}
        await Patient.deleteOne({ _id: id,doctorId});
        return message
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default PatientResolver;
