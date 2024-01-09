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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var data_1 = require("../data");
var user_model_1 = require("../models/user.model");
var router = (0, express_1.Router)();
var jwtSecret = process.env.JWT_SECRET;
router.get('/seed', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usersCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.UserModel.countDocuments()];
            case 1:
                usersCount = _a.sent();
                if (usersCount > 0) {
                    res.send('Database already seeded');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user_model_1.UserModel.create(data_1.sample_users)];
            case 2:
                _a.sent();
                res.send('Database seeded');
                return [2 /*return*/];
        }
    });
}); }));
router.post("/login", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    res.send(generateTokenResponse(user));
                }
                else {
                    res.status(401).send('Invalid email or password');
                }
                return [2 /*return*/];
        }
    });
}); }));
router.post('/register', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, address, user, encryptedPassword, newUser, dbUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, address = _a.address;
                return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (user) {
                    res.status(401).send('User already exists, please login!');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                encryptedPassword = _b.sent();
                newUser = {
                    id: '',
                    name: name,
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                    address: address,
                    isAdmin: false
                };
                return [4 /*yield*/, user_model_1.UserModel.create(newUser)];
            case 3:
                dbUser = _b.sent();
                res.send(generateTokenResponse(dbUser));
                return [2 /*return*/];
        }
    });
}); }));
var generateTokenResponse = function (user) {
    var token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }, jwtSecret, { expiresIn: '30d' });
    return {
        id: user.id,
        email: user.email,
        name: user.name || '',
        address: user.address || '',
        isAdmin: user.isAdmin,
        token: token
    };
};
exports.default = router;
