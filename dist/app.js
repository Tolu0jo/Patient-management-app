"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_1 = require("apollo-server");
const merge_1 = require("@graphql-tools/merge");
const doctorTypeDef_1 = __importDefault(require("./Graphql/typeDefs/doctorTypeDef"));
const patientTypeDef_1 = __importDefault(require("./Graphql/typeDefs/patientTypeDef"));
const doctor_1 = __importDefault(require("./Graphql/resolvers/doctor"));
const patient_1 = __importDefault(require("./Graphql/resolvers/patient"));
const typeDefs = (0, merge_1.mergeTypeDefs)([doctorTypeDef_1.default, patientTypeDef_1.default]);
const resolvers = (0, merge_1.mergeResolvers)([doctor_1.default, patient_1.default]);
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        {
            req;
        }
        ;
    },
});
mongoose_1.default.connect(process.env.DATABASE_URL)
    .then(() => {
    console.log("Database Connected Successfully");
})
    .catch((error) => {
    console.log("Error connecting to database:", error.message);
});
const port = 4000;
server.listen(port, () => {
    console.log(`Server listening at ${port} ...`);
});
