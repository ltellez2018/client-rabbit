import {stock} from "../Intefaces/stock.interface";
import {Transaccion} from "../Intefaces/transaction.interface";
import rabbit from "../rabbitMQ/Rabbit";



class ReporterService {

    channelName: string = 'adidas';

    private async init(): Promise<boolean> {
        let isInit = true;

        await rabbit.getActive().then(activo => {
            console.log(`RabbitMQ esta ${activo ? 'Activo' : 'Inactivo'}`)
        }).catch(err => {
            isInit = false
            console.log({err});
        });

        await rabbit.purgeQueue(this.channelName).then(
            ({messageCount}) => {
                console.log(`El canal ${this.channelName} tiene ${messageCount} mensajes`);
            }).catch(err => {
            isInit = false
            console.log({err});
        });
        return isInit;
    }

    public async sendStock(jsonStock: stock): Promise<boolean> {
        let status = false;
        console.log(`RabbitMQ  ${await this.init() ? 'SI' : 'NO'}  se ha inicializado`);

        await rabbit.sendToQueue(this.channelName, jsonStock)
            .then((state: boolean) => {
                status = state;
                console.log(`El envio del mensaje fue ${state ? 'Exitoso' : 'Fallido'}`);
            }).catch(err => {
            status = false
            console.log({err});
        });


        return status;
    }

    public async sendTransaccion(jsonTransaccion: Transaccion): Promise<boolean> {
        let status = false;

        console.log(`RabbitMQ  ${await this.init() ? 'SI' : 'NO'} se ha  inicializado`);

        await rabbit.sendToQueue(this.channelName, jsonTransaccion)
            .then((state: boolean) => {
                status = state;
                console.log(`El envio del mensaje fue ${state ? 'Exitoso' : 'Fallido'}`);
            }).catch(err => {
            status = false
            console.log({err});
        });


        return status;
    }


}


const reporterService = new ReporterService();

export const initSendStock = async (jsonStock: stock) => {
    const status: boolean = await reporterService.sendStock(jsonStock);
    return status
}

export const initSendTransaccion = async (jsonTransaccion: Transaccion) => {
    const status: boolean = await reporterService.sendTransaccion(jsonTransaccion);
    return status
}
