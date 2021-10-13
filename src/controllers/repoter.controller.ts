import {Request, Response} from "express";
import {initSendStock, initSendTransaccion} from "../services/reporter.service";
import {stock} from "../Intefaces/stock.interface";
import {Transaccion} from "../Intefaces/transaction.interface";


export const testing = async (req: Request, res: Response): Promise<Response> => {
    console.log('****** testing ******');



    return res.status(200).json({
        ok : true,
        msg: "The client is ready"
    });
};


export const sendStock = async (req: Request, res: Response): Promise<Response> => {
    console.log('****** sendStock ******');
    const jsonStock: stock =  { ... req.body };

    console.log(`jsonStock -> ${JSON.stringify(jsonStock.info)}`);

    let ok =  await initSendStock(jsonStock)
    let msg = ok ? "the request was sent correctly":"the request could not be sent";
    console.log(`ok -> ${ok}`);

    return res.status(200).json({
        ok,
        msg
    });
};



export const sendTransaccion = async (req: Request, res: Response): Promise<Response> => {
    console.log('****** sendTransaccion ******');

    console.log(`Transaccion -> ${JSON.stringify(req.body.trxType)}`);

    const jsonTransaccion: Transaccion =  { ... req.body };

    let ok =  await initSendTransaccion(jsonTransaccion)
    let msg = ok ? "the request was sent correctly":"the request could not be sent";
    console.log(`ok -> ${ok}`);
    return res.status(200).json({
        ok,
        msg
    });
};





