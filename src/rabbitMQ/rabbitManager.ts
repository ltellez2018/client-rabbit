
import {Channel, Connection, ConsumeMessage, Replies} from "amqplib/callback_api";
import rabbit from "./Rabbit";



export const getConnection = async (): Promise<Connection> => {
    return await rabbit.getConnection()
}
export const isConnected = async (): Promise<Boolean> => {
    if ((await rabbit.getActive()) !== true) {
        return false
    }
    const conn = await getConnection()
    return conn !== null
}
export const getChannel = async (channelName: string): Promise<Channel> => {
    return await rabbit.getChannel(channelName)
}
export const sendToQueue = async (channelName: string, message: any): Promise<boolean> => {
    return await rabbit.sendToQueue(channelName, message)
}
export const sendToQueueWithOptions = async (channelName: string, message: any, options: any): Promise<boolean> => {
    return await rabbit.sendToQueueWithOptions(channelName, message, options)
}
export const consume = async (channelName: string, callback: (msg: ConsumeMessage | null) => any): Promise<void> => {
    await rabbit.consume(channelName, callback)
}
export const get = async (channelName: string, callback: any): Promise<void> => {
    await rabbit.get(channelName, callback)
}
export const purgeQueue = async (channelName: string): Promise<Replies.PurgeQueue> => {
    return await rabbit.purgeQueue(channelName)
}

export const close = async (): Promise<void> => {
    await rabbit.close()
}
