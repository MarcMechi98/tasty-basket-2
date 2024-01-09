"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var food_router_1 = __importDefault(require("./routers/food.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var order_router_1 = __importDefault(require("./routers/order.router"));
var database_config_1 = require("./configs/database.config");
(0, database_config_1.dbConnect)();
var PORT = 5000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: [
        'http://localhost:4200',
    ]
}));
app.use("/api/foods", food_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/orders", order_router_1.default);
app.listen(PORT, function () {
    console.log('Website server running on http://localhost:' + PORT + '!');
});
