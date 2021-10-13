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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaccion = exports.sendStock = exports.testing = void 0;
const reporter_service_1 = require("../services/reporter.service");
exports.testing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('****** testing ******');
    return res.status(200).json({
        ok: true,
        msg: "The client is ready"
    });
});
exports.sendStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('****** sendStock ******');
    const jsonStock = Object.assign({}, req.body);
    console.log(`jsonStock -> ${JSON.stringify(jsonStock.info)}`);
    let ok = yield reporter_service_1.initSendStock(jsonStock);
    let msg = ok ? "the request was sent correctly" : "the request could not be sent";
    console.log(`ok -> ${ok}`);
    return res.status(200).json({
        ok,
        msg
    });
});
exports.sendTransaccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('****** sendTransaccion ******');
    console.log(`Transaccion -> ${JSON.stringify(req.body.trxType)}`);
    const jsonTransaccion = Object.assign({}, req.body);
    let ok = yield reporter_service_1.initSendTransaccion(jsonTransaccion);
    let msg = ok ? "the request was sent correctly" : "the request could not be sent";
    console.log(`ok -> ${ok}`);
    return res.status(200).json({
        ok,
        msg
    });
});
