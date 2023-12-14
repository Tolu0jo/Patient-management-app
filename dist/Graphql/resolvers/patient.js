"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientModel_1 = __importDefault(require("../../Model/patientModel"));
const secret = process.env.JWT_SECRET;
const PatientResolver = {
    Query: {
        allPatients: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(context);
                const patients = yield patientModel_1.default.find();
                return patients;
            }
            catch (error) {
                console.log(error);
            }
        }),
        eachPatient: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const patient = yield patientModel_1.default.findById(id);
                return patient;
            }
            catch (error) {
                console.log(error);
            }
        }),
        myPatients: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = context;
            const patients = yield patientModel_1.default.find({ doctorId: id });
            return patients;
        })
    },
    Mutation: {
        RegisterPatient: (_, { RegisterPatientInput: { age, patientName, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis, }, }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newPatient = new patientModel_1.default({
                    patientName: patientName,
                    age: age,
                    weight: weight,
                    doctorId: context.id,
                    height: height,
                    bloodGroup: bloodGroup,
                    genotype: genotype,
                    bloodPressure: bloodPressure,
                    HIV_status: HIV_status,
                    hepatitis: hepatitis,
                });
                const patient = yield newPatient.save();
                return patient;
            }
            catch (error) {
                console.log(error);
            }
        }),
        UpdatePatient: (_, { id, UpdatePatientInput: { age, patientName, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis, }, }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const doctorId = context.id;
                const message = { message: "Patient Updated Successfully" };
                yield patientModel_1.default.updateOne({ _id: id, doctorId }, {
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
                });
                return message;
            }
            catch (error) {
                console.log(error);
            }
        }),
        DeletePatient: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const doctorId = context.id;
                const message = { message: "Patient Deleted Successfully" };
                yield patientModel_1.default.deleteOne({ _id: id, doctorId });
                return message;
            }
            catch (error) {
                console.log(error);
            }
        }),
    },
};
exports.default = PatientResolver;
