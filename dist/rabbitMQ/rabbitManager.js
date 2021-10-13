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
exports.close = exports.purgeQueue = exports.get = exports.consume = exports.sendToQueueWithOptions = exports.sendToQueue = exports.getChannel = exports.isConnected = exports.getConnection = void 0;
const Rabbit_1 = __importDefault(require("./Rabbit"));
exports.getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Rabbit_1.default.getConnection();
});
exports.isConnected = () => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield Rabbit_1.default.getActive()) !== true) {
        return false;
    }
    const conn = yield exports.getConnection();
    return conn !== null;
});
exports.getChannel = (channelName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Rabbit_1.default.getChannel(channelName);
});
exports.sendToQueue = (channelName, message) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Rabbit_1.default.sendToQueue(channelName, message);
});
exports.sendToQueueWithOptions = (channelName, message, options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Rabbit_1.default.sendToQueueWithOptions(channelName, message, options);
});
exports.consume = (channelName, callback) => __awaiter(void 0, void 0, void 0, function* () {
    yield Rabbit_1.default.consume(channelName, callback);
});
exports.get = (channelName, callback) => __awaiter(void 0, void 0, void 0, function* () {
    yield Rabbit_1.default.get(channelName, callback);
});
exports.purgeQueue = (channelName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Rabbit_1.default.purgeQueue(channelName);
});
exports.close = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Rabbit_1.default.close();
});
