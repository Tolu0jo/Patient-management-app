import Patient, { PatientRegister, UpdatePatient } from "../../Model/patientModel";

const PatientResolver = {
  Query: {
    allPatients: async () => {
      try {
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
    ) => {
      try {
        const newPatient = new Patient({
          patientName: patientName,
          age: age,
          weight: weight,
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
      }: UpdatePatient
    ) => {
      try {

        const message = {message:"Patient Updated Successfully"}
        await Patient.updateOne(
          { _id: id },
          {
            patientName: patientName,
            age: age,
            weight: weight,
            height: height,
            bloodGroup: bloodGroup,
            genotype: genotype,
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
    DeletePatient: async (_: unknown, { id }: UpdatePatient) => {
      try {
        const message = {message:"Patient Deleted Successfully"}
       await Patient.deleteOne({ _id: id });
        return message
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default PatientResolver;
