
export interface operation {
    companyCode: string,
    storeCode: string,
    countryCode : string,
    locationCode: string,
    locationStatus: string,
    revenueCenter: string,
    itemCode: string,
    itemDescription: string,
    date: Date,
    originatorChannel: string,
    qty: number,
    actualUnitPrice: number,
    qtyOnHand: number,
    currencyISOCode : string,
    serialNumber : string,
    importDocNumber : string,
    customsNumber : string,
    customsDate : string,
    originatorDocument: string,
    substractFlag: boolean,
}
