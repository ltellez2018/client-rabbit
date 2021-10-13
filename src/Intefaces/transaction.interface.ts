import {item} from "./item.interface";

export interface Transaccion {
    trxType : string,
    trxNumber : number,
    trxNumberOriginal: number,
    trxTypeLang : string,
    companyCode : string,
    countryCode : string,
    companyName : string,
    storeCode : string,
    storeName : string,
    terminalCode : string,
    periodNumber : number,
    sbPeriodNumber : number,
    businessDayDate : Date,
    beginDateTime : Date,
    endDateTime : Date,
    beginDateTimeAsInt : number,
    beginDateTimeHour : number,
    operatorCode : string,
    operatorName : string,
    currencyISOCode : string,
    itemCount : number,
    grossAmount : number,
    taxAmount : number,
    promoDiscountAmount : number,
    manualDiscountAmount : number,
    trainingModeFlag : boolean,
    suspendedFlag : boolean,
    cancelFlag : boolean,
    offlineFlag : boolean,
    contingencyFlag : boolean,
    netSalesAmount: number,
    returnAmount : number,
    grossPositiveAmount : number,
    grossNegativeAmount : number,
    ivaTaxAmount : number,
    internalTaxAmount : number,
    perceptionAmount : number,
    transactionDiscountAmount : number,
    iva0Amount : number,
    iva21Amount : number,
    iva10Amount : number,
    iva27Amount : number,
    fiscalPosNumber : string,
    billType : string,
    serieOfficialBill : string,
    billNumber : string,
    fiscalCAENumber : string,
    fiscalCAEDate : Date,
    currentZNumber : number,
    currencyDescription : string,
    originalSerieOfficialBill : string,
    originalFiscalPOSNumber : string,
    originalBillNumber : string,
    hasCustomer : boolean,
    denomination : string,
    partyCode : string,
    partyTaxCategory : string,
    partyType: string,
    partyFirstName : string,
    partyLastName : string,
    partyPerson : boolean,
    partyOrganization : boolean,
    partyIdentificationType : string,
    partyIdentificationNumber : string,
    items: item [],
    payments : any[],
    discounts : any[],
}