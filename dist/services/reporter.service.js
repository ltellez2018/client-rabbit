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
exports.initSendTransaccion = exports.initSendStock = void 0;
const Rabbit_1 = __importDefault(require("../rabbitMQ/Rabbit"));
class ReporterService {
    constructor() {
        this.channelName = 'adidas';
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let isInit = true;
            yield Rabbit_1.default.getActive().then(activo => {
                console.log(`RabbitMQ esta ${activo ? 'Activo' : 'Inactivo'}`);
            }).catch(err => {
                isInit = false;
                console.log({ err });
            });
            yield Rabbit_1.default.purgeQueue(this.channelName).then(({ messageCount }) => {
                console.log(`El canal ${this.channelName} tiene ${messageCount} mensajes`);
            }).catch(err => {
                isInit = false;
                console.log({ err });
            });
            return isInit;
        });
    }
    sendStock(jsonStock) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = false;
            console.log(`RabbitMQ  ${(yield this.init()) ? 'SI' : 'NO'}  se ha inicializado`);
            yield Rabbit_1.default.sendToQueue(this.channelName, jsonStock)
                .then((state) => {
                status = state;
                console.log(`El envio del mensaje fue ${state ? 'Exitoso' : 'Fallido'}`);
            }).catch(err => {
                status = false;
                console.log({ err });
            });
            return status;
        });
    }
    sendTransaccion(jsonTransaccion) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = false;
            console.log(`RabbitMQ  ${(yield this.init()) ? 'SI' : 'NO'} se ha  inicializado`);
            yield Rabbit_1.default.sendToQueue(this.channelName, jsonTransaccion)
                .then((state) => {
                status = state;
                console.log(`El envio del mensaje fue ${state ? 'Exitoso' : 'Fallido'}`);
            }).catch(err => {
                status = false;
                console.log({ err });
            });
            return status;
        });
    }
}
const reporterService = new ReporterService();
exports.initSendStock = (jsonStock) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield reporterService.sendStock(jsonStock);
    return status;
});
exports.initSendTransaccion = (jsonTransaccion) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield reporterService.sendTransaccion(jsonTransaccion);
    return status;
});
