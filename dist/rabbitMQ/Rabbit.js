"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rabbit = void 0;
const config_1 = __importDefault(require("../config/config"));
const amqp = require('amqplib/callback_api');
class Rabbit {
    constructor(params) {
        this.params = params;
        this.channels = {};
    }
    getUrl() {
        return Promise.resolve(config_1.default.RABBIT.URI);
    }
    getActive() {
        return Promise.resolve(config_1.default.RABBIT.ACTIVE);
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.getActive()
                .then(active => {
                if (!active) {
                    return reject('No se utiliza rabbit');
                }
                return active;
            })
                .then(res => {
                return this.getUrl()
                    .then(url => {
                    if (!url) {
                        return reject('Se deben configurar el acceso a rabbit. {rabbit:{url}}');
                    }
                    amqp.connect(url, {}, function (err, connection) {
                        if (err) {
                            console.error('Ocurrio un error al intentar conectar RabbitMQ');
                            console.error(err.toString());
                            return reject(err);
                        }
                        return resolve(connection);
                    });
                });
            });
        });
    }
    getConnection() {
        return new Promise((resolve, reject) => {
            if (!this.conn) {
                console.debug('Conectando con RabbitMQ');
                this.connect().then((conn) => {
                    console.debug('RabbitMQ Connection stablished');
                    this.conn = conn;
                    resolve(this.conn);
                }).catch(err => {
                    reject(err);
                });
            }
            else {
                resolve(this.conn);
            }
        });
    }
    createChannel(name, options = { durable: true }) {
        return new Promise((resolve, reject) => {
            return this.getConnection().then((conn) => {
                return conn.createChannel((err, channel) => {
                    if (err) {
                        return reject(err);
                    }
                    channel.assertQueue(name, options);
                    console.debug('El canal ' + name + ' se creo con éxito');
                    return resolve(channel);
                });
            });
        });
    }
    sendToQueue(channelName, message) {
        return this.getChannel(channelName).then((channel) => {
            let value = Buffer.from(JSON.stringify(message));
            // const op = { persistent : true }
            return channel.sendToQueue(channelName, value);
        });
    }
    sendToQueueWithOptions(channelName, message, options) {
        return this.getChannel(channelName).then((channel) => {
            let value = Buffer.from(JSON.stringify(message));
            // const op = { persistent : true }
            return channel.sendToQueue(channelName, value, { persistent: true, headers: options });
        });
    }
    consume(channelName, onMessage, options) {
        return this.getChannel(channelName).then((channel) => {
            const op = Object.assign({ noAck: true }, options);
            //const op = {...options}
            return channel.consume(channelName, onMessage, op);
        });
    }
    get(channelName, onMessage, options) {
        return this.getChannel(channelName).then((channel) => {
            const op = Object.assign({ noAck: true }, options);
            //const op = {...options}
            return channel.get(channelName, op, onMessage);
        });
    }
    purgeQueue(channelName) {
        return new Promise((resolve, reject) => {
            return this.getChannel(channelName)
                .then((channel) => {
                return channel.purgeQueue(channelName, (err, ok) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(ok);
                });
            });
        });
    }
    getChannel(name, options = { durable: true }) {
        return this.getConnection()
            .then((conn) => {
            if (!this.channels[name]) {
                return this.createChannel(name, options).then((channel) => {
                    this.channels[name] = channel;
                    return channel;
                });
            }
            else {
                return this.channels[name];
            }
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            if (this.conn) {
                this.conn.close((err) => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        this.conn = undefined;
                        this.channels = {};
                        return resolve();
                    }
                });
            }
            else {
                resolve();
            }
        });
    }
}
exports.Rabbit = Rabbit;
const rabbit = new Rabbit(config_1.default);
exports.default = rabbit;
