"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
const jwtsecret = process.env.JWT_SECRET;
const auth = (context, next) => {
    const authentication = context.req.headers.authorization;
    if (authentication) {
        const token = authentication.split("Bearer")[1];
        if (token) {
            try {
                const verified = jsonwebtoken_1.default.verify(token, jwtsecret);
                return verified;
            }
            catch (error) {
                throw new apollo_server_1.AuthenticationError("Invalid/expired token");
            }
        }
        ;
        throw new Error("Provide Bearer token");
    }
    throw new Error("Athorization header must be provded");
};
exports.auth = auth;
