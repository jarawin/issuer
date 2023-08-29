export const STATUS_LIST = Object.freeze([
  {
    min: 0,
    max: 199,
    color: "#EFC050",
  },
  {
    min: 200,
    max: 299,
    color: "#009B77",
  },
  {
    min: 300,
    max: 999,
    color: "#DD4124",
  },
]);

export const API_STATUS_TEXT = Object.freeze({
  100: "Continue",
  101: "Switching Protocols",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
});

export const SALE_API = Object.freeze({
  endpoint: "www.issuer.com/api/payments/sale",
  method: "POST",
  sample: `{
  "requestId": "A12345",
  "amount": "2000",
  "cardNumber": "6011575345876153",
  "acquirerId": "0B49731D1DF34F5C846E747EAD709467"
}`,
});

export const SALE_API_DOC = Object.freeze([
  {
    title: "requestId",
    type: "String",
    meaning: `This is a unique identifier for the request. It could be a reference number or a transaction ID assigned by the client initiating the request. It helps in tracking and identifying specific transactions.`,
  },
  {
    title: "amount",
    type: "Number",
    meaning: `This is the amount of the transaction in the smallest unit of the currency. For example, if the currency is THB, the amount should be in satang. If the currency is USD, the amount should be in cents.`,
  },
  {
    title: "cardNumber",
    type: "Number",
    meaning: `This attribute holds the card number associated with the transaction. It is usually a string of digits that represents the card used for the sale.`,
  },
  {
    title: "acquirerId",
    type: "String",
    meaning: `The acquirer ID refers to the unique identifier of the entity (often a financial institution) that is processing the payment. It is used to route the payment request to the appropriate entity for processing.`,
  },
]);

export const VOID_API = Object.freeze({
  endpoint: "www.issuer.com/api/payments/void",
  method: "POST",
  sample: `{
  "transactionId":"7746F95E1BEA496FACFC83B9E3ABA494",
  "requestId": "C1312",
  "acquirerId": "0B49731D1DF34F5C846E747EAD709467"
}`,
});

export const VOID_API_DOC = Object.freeze([
  {
    title: "requestId",
    type: "String",
    meaning: `This is a unique identifier for the request. It could be a reference number or a transaction ID assigned by the client initiating the request. It helps in tracking and identifying specific transactions.`,
  },
  {
    title: "acquirerId",
    type: "String",
    meaning: `The acquirer ID refers to the unique identifier of the entity (often a financial institution) that is processing the payment. It is used to route the payment request to the appropriate entity for processing.`,
  },
  {
    title: "transactionId",
    type: "String",
    meaning: `This is a unique identifier for the transaction. It is assigned by the issuer and is used to track the transaction.`,
  },
]);

export const REVERSE_API = Object.freeze({
  endpoint: "www.issuer.com/api/payments/reverse",
  method: "POST",
  sample: `{
  "requestId": "A1312",
  "acquirerId": "0366AF74D4364D8FA8AC87E8AD0ED7F6"
}`,
});

export const REVERSE_API_DOC = Object.freeze([
  {
    title: "requestId",
    type: "String",
    meaning: `This is a unique identifier for the request. It could be a reference number or a transaction ID assigned by the client initiating the request. It helps in tracking and identifying specific transactions.`,
  },
  {
    title: "acquirerId",
    type: "String",
    meaning: `The acquirer ID refers to the unique identifier of the entity (often a financial institution) that is processing the payment. It is used to route the payment request to the appropriate entity for processing.`,
  },
]);

export const SETTLEMENT_API = Object.freeze({
  endpoint: "www.issuer.com/api/payments/settlement",
  method: "POST",
  sample: `{
  "acquirerId": "0366AF74D4364D8FA8AC87E8AD0ED7F6",
  "totalAmount": "4200",
  "totalTransaction": "2"
}`,
});

export const SETTLEMENT_API_DOC = Object.freeze([
  {
    title: "requestId",
    type: "String",
    meaning: `This is a unique identifier for the request. It could be a reference number or a transaction ID assigned by the client initiating the request. It helps in tracking and identifying specific transactions.`,
  },
  {
    title: "totalAmount",
    type: "Number",
    meaning: `This is the total amount of the transaction in the smallest unit of the currency. For example, if the currency is THB, the amount should be in satang. If the currency is USD, the amount should be in cents.`,
  },
  {
    title: "totalTransaction",
    type: "Number",
    meaning: `This is the total number of transactions in the settlement.`,
  },
]);

export const BATCHUPLOAD_API = Object.freeze({
  endpoint: "www.issuer.com/api/payments/batch-upload",
  method: "POST",
  sample: `{
  "acquirerId": "0366AF74D4364D8FA8AC87E8AD0ED7F6",
  "transactions": [
  {
  "transactionId": "6654C60EB5F343AD843F450BC0C48A2B",
  "requestId": "A1312",
  "amount": 1500,
  }
]
}`,
});

export const BATCHUPLOAD_API_DOC = Object.freeze([
  {
    title: "acquirerId",
    type: "String",
    meaning: `The acquirer ID refers to the unique identifier of the entity (often a financial institution) that is processing the payment. It is used to route the payment request to the appropriate entity for processing.`,
  },
  {
    title: "transactions",
    type: "Array of Objects",
    meaning: `This is an array of transactions. Each transaction is an object with the following attributes: requestId, amount, currency, transactionId.`,
  },
  {
    title: "transactions[].requestId",
    type: "String",
    meaning: `This is a unique identifier for the request. It could be a reference number or a transaction ID assigned by the client initiating the request. It helps in tracking and identifying specific transactions.`,
  },
  {
    title: "transactions[].amount",
    type: "Number",
    meaning: `This is the amount of the transaction in the smallest unit of the currency. For example, if the currency is THB, the amount should be in satang. If the currency is USD, the amount should be in cents.`,
  },
  {
    title: "transactions[].transactionId",
    type: "String",
    meaning: `This is a unique identifier for the transaction. It is assigned by the issuer and is used to track the transaction.`,
  },
]);

export const REFUND_API = Object.freeze({
  endpoint: "www.issuer.com/api/payments/batch-upload",
  method: "POST",
  sample: `{
  "transactionId":"9A69F7BA6CD34F6A8FEA8CA7D6AF57FB",
  "requestId": "B1312",
  "acquirerId": "0366AF74D4364D8FA8AC87E8AD0ED7F6"
}`,
});

export const REFUND_API_DOC = Object.freeze([
  {
    title: "requestId",
    type: "String",
    meaning: `This is a unique identifier for the request. It could be a reference number or a transaction ID assigned by the client initiating the request. It helps in tracking and identifying specific transactions.`,
  },
  {
    title: "acquirerId",
    type: "String",
    meaning: `The acquirer ID refers to the unique identifier of the entity (often a financial institution) that is processing the payment. It is used to route the payment request to the appropriate entity for processing.`,
  },
  {
    title: "transactionId",
    type: "String",
    meaning: `This is a unique identifier for the transaction. It is assigned by the issuer and is used to track the transaction.`,
  },
]);

export const INQUIRY_API = Object.freeze({
  endpoint: "www.issuer.com/api/payments/batch-upload",
  method: "POST",
  sample: `{
  "transactionId":"9A69F7BA6CD34F6A8FEA8CA7D6AF57FB",
  "requestId": "C1312",
  "acquirerId": "0366AF74D4364D8FA8AC87E8AD0ED7F6"
}`,
});

export const INQUIRY_API_DOC = Object.freeze([
  {
    title: "requestId",
    type: "String",
    meaning: `This is a unique identifier for the request. It could be a reference number or a transaction ID assigned by the client initiating the request. It helps in tracking and identifying specific transactions.`,
  },
  {
    title: "acquirerId",
    type: "String",
    meaning: `The acquirer ID refers to the unique identifier of the entity (often a financial institution) that is processing the payment. It is used to route the payment request to the appropriate entity for processing.`,
  },
  {
    title: "transactionId",
    type: "String",
    meaning: `This is a unique identifier for the transaction. It is assigned by the issuer and is used to track the transaction.`,
  },
]);
