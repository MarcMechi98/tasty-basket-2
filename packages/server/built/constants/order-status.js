"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["NEW"] = "New";
    OrderStatus["PAID"] = "Paid";
    OrderStatus["DELIVERED"] = "Delivered";
    OrderStatus["CANCELED"] = "Canceled";
    OrderStatus["REFUNDED"] = "Refunded";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
