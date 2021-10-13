import config from "../config/config";

const amqp = require('amqplib/callback_api')

import {Channel, Connection, Message, Options, Replies} from "amqplib/callback_api";


class Rabbit {
    protected conn: Connection | undefined
    public channels: any
    protected params: any

    constructor(params: any) {
        this.params = params
        this.channels = {}
    }

    public getUrl(): Promise<string> {
        return  Promise.resolve(config.RABBIT.URI);
    }

    public  getActive(): Promise<boolean> {
        return  Promise.resolve(config.RABBIT.ACTIVE);
    }

    protected connect(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            this.getActive()
                .then(active => {
                    if (!active) {
                        return reject('No se utiliza rabbit')
                    }
                    return active
                })
                .then(res => {
                    return this.getUrl()
                        .then(url => {
                            if (!url) {
                                return reject('Se deben configurar el acceso a rabbit. {rabbit:{url}}')
                            }
                            amqp.connect(url, {}, function (err: any, connection: Connection) {
                                if (err) {
                                    console.error('Ocurrio un error al intentar conectar RabbitMQ')
                                    console.error(err.toString())
                                    return reject(err);
                                }
                                return resolve(connection)
                            });
                        })
                })
        })
    }

    public getConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            if (!this.conn) {
                console.debug('Conectando con RabbitMQ')
                this.connect().then((conn: Connection) => {
                    console.debug('RabbitMQ Connection stablished')
                    this.conn = conn
                    resolve(this.conn)
                }).catch(err => {
                    reject(err)
                })
            } else {
                resolve(this.conn)
            }
        })
    }

    public createChannel(name: string, options: any = {durable: true}): Promise<Channel> {
        return new Promise((resolve, reject) => {
            return this.getConnection().then((conn: Connection) => {
                return conn.createChannel((err: any, channel: Channel) => {
                    if (err) {
                        return reject(err);
                    }
                    channel.assertQueue(name, options);
                    console.debug('El canal ' + name + ' se creo con éxito')
                    return resolve(channel)

                })
            })
        })
    }

    public sendToQueue(channelName: string, message: any): Promise<boolean> {
        return this.getChannel(channelName).then((channel: Channel) => {
            let value: any = Buffer.from(JSON.stringify(message))
            // const op = { persistent : true }
            return channel.sendToQueue(channelName, value)
        })
    }

    public sendToQueueWithOptions(channelName: string, message: any, options: any): Promise<boolean> {
        return this.getChannel(channelName).then((channel: Channel) => {
            let value: any = Buffer.from(JSON.stringify(message))
            // const op = { persistent : true }
            return channel.sendToQueue(channelName, value, { persistent: true, headers: options})
        })
    }

    public consume(channelName: string, onMessage: (msg: Message | null) => any, options?: Options.Consume): Promise<void> {
        return this.getChannel(channelName).then((channel: Channel) => {
            const op = {noAck: true, ...options}
            //const op = {...options}
            return channel.consume(channelName, onMessage, op)
        })
    }

    public get(channelName: string, onMessage: any, options?: Options.Consume): Promise<void> {
        return this.getChannel(channelName).then((channel: Channel) => {
            const op = {noAck: true, ...options}
            //const op = {...options}
            return channel.get(channelName, op, onMessage)
        })
    }

    public purgeQueue(channelName: string): Promise<Replies.PurgeQueue> {
        return new Promise((resolve, reject) => {
            return this.getChannel(channelName)
                .then((channel: Channel) => {
                    return channel.purgeQueue(channelName, (err, ok: Replies.PurgeQueue) => {
                        if (err) {
                            return reject(err)
                        }
                        resolve(ok)
                    })
                })
        })
    }


    public getChannel(name: string, options: any = {durable: true}): Promise<Channel> {
        return this.getConnection()
            .then((conn: Connection) => {
                if (!this.channels[name]) {
                    return this.createChannel(name, options).then((channel: Channel) => {
                        this.channels[name] = channel
                        return channel
                    })
                } else {
                    return this.channels[name]
                }
            })
    }

    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.conn) {
                this.conn.close((err) => {
                    if (err) {
                        return reject(err)
                    } else {
                        this.conn = undefined
                        this.channels = {}
                        return resolve()
                    }
                })
            } else {
                resolve()

            }
        })
    }
}

export {Rabbit}
const rabbit = new Rabbit(config)
export default rabbit
