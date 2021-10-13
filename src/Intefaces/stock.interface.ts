/**
 * Representación de movimiento de stock externo
 */
import {operation} from "./operation.interface";


export interface stock {

    info: string,
    dateTime: string,
    operations: operation [],

}
