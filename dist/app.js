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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_1 = require("apollo-server");
const merge_1 = require("@graphql-tools/merge");
const doctorTypeDef_1 = __importDefault(require("./Graphql/typeDefs/doctorTypeDef"));
const patientTypeDef_1 = __importDefault(require("./Graphql/typeDefs/patientTypeDef"));
const doctor_1 = __importDefault(require("./Graphql/resolvers/doctor"));
const patient_1 = __importDefault(require("./Graphql/resolvers/patient"));
const utils_1 = require("./utils");
const graphql_1 = require("graphql");
const typeDefs = (0, merge_1.mergeTypeDefs)([doctorTypeDef_1.default, patientTypeDef_1.default]);
const resolvers = (0, merge_1.mergeResolvers)([doctor_1.default, patient_1.default]);
dotenv_1.default.config();
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const isIntrospection = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.operationName) === 'IntrospectionQuery';
            if (isIntrospection) {
                return null; // Skip token verification for introspection
            }
            const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
            if (!token)
                return new graphql_1.GraphQLError("No token provided");
            const user = yield (0, utils_1.verifyToken)(token);
            return user;
        }
        catch (error) {
            throw new graphql_1.GraphQLError("Invalid token"), {
                extensions: { code: "NOT_AUTHENTICATED" }
            };
        }
    }),
    persistedQueries: false,
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
