"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (req, res, next) {
    var token = req.headers.access_token;
    if (!token)
        return res.status(401).send({ message: 'No token' });
    try {
        var decodedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
    }
    catch (err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
    return next();
});
