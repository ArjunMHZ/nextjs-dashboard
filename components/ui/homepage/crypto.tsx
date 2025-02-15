import CryptoJS from 'crypto-js';

export const generateSignature = (secretKey:string, totalAmount: number, transactionUUID: string, productCode: string) => {
    const message = `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`;
    const hash = CryptoJS.HmacSHA256(message, secretKey);
    return CryptoJS.enc.Base64.stringify(hash);
};


