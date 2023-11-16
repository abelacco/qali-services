export enum Status {
  PENDING = 0,
  WAITING = 1,
  CONFIRMED = 2,
  CANCELED = 3,
}

export const DOCUMENT_IDENTIFIERS = {
  DNI_LENGTH: 8,
  RUC_LENGTH: 11,
  DNI_TYPE: 'dni',
  RUC_TYPE: 'ruc',
};

export const PaymentStatus = {
  POR_PAGAR: 'por pagar',
  PAGADO: 'pagado',
};
