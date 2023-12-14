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
const doctorModel_1 = __importDefault(require("../../Model/doctorModel"));
const apollo_server_1 = require("apollo-server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../utils");
const graphql_1 = require("graphql");
dotenv_1.default.config();
const DoctorResolver = {
    Query: {
        allDoctors: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const doctors = yield doctorModel_1.default.find();
                return doctors;
            }
            catch (error) {
                console.log(error);
            }
        }),
        eachDoctor: (_, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const doctor = yield doctorModel_1.default.findById(id);
                return doctor;
            }
            catch (error) {
                console.log(error);
            }
        }),
        me: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = context;
            const doctor = yield doctorModel_1.default.findById(id);
            return doctor;
        })
    },
    Mutation: {
        CreateDoctor: (_, { CreateDoctorInput: { email, DoctorsName, password, phoneNumber, gender, specialization, }, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const existingDoctor = yield doctorModel_1.default.findOne({ email });
                if (existingDoctor) {
                    throw new apollo_server_1.ApolloError("Doctor already exists with this " + email, "USER_ALREADY_EXISTS");
                }
                const genSalt = 10;
                const encryptedPassword = yield bcrypt_1.default.hash(password, genSalt);
                const newDoctor = new doctorModel_1.default({
                    email: email.toLowerCase(),
                    DoctorsName: DoctorsName,
                    password: encryptedPassword,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    specialization: specialization,
                });
                const token = yield (0, utils_1.createToken)(newDoctor._id);
                const doctor = yield newDoctor.save();
                return { doctor, token };
            }
            catch (error) {
                throw new graphql_1.GraphQLError(`${error}`);
            }
        }),
        LoginDoctor: (_, { LoginInput: { email, password } }) => __awaiter(void 0, void 0, void 0, function* () {
            const validDoctor = yield doctorModel_1.default.findOne({ email });
            if (!validDoctor)
                throw new apollo_server_1.ApolloError("Invalid Credentials", "INVALID_CREDENTIALS");
            const validPassword = yield bcrypt_1.default.compare(password, validDoctor.password);
            if (validDoctor && validPassword) {
                const token = yield (0, utils_1.createToken)(validDoctor._id);
                return { validDoctor, token };
            }
            else {
                throw new apollo_server_1.ApolloError("Invalid Credentials", "INVALID_CREDENTIALS");
            }
        }),
        UpdateDoctor: (_, { UpdateDoctorInput: { email, DoctorsName, password, phoneNumber, gender, specialization, }, }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const genSalt = 10;
                const { id } = context;
                const encryptedPassword = yield bcrypt_1.default.hash(password, genSalt);
                const updatedDoctor = yield doctorModel_1.default.updateOne({ _id: id }, {
                    email: email,
                    DoctorsName: DoctorsName,
                    password: encryptedPassword,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    specialization: specialization,
                });
                return updatedDoctor.modifiedCount;
            }
            catch (error) {
                console.log(error);
            }
        }),
        DeleteDoctor: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = context;
                const doctor = yield doctorModel_1.default.deleteOne({ _id: id });
                return doctor.deletedCount;
            }
            catch (error) {
                console.log(error);
            }
        }),
    },
};
exports.default = DoctorResolver;
