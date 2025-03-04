import { CommonModel, IPagination, IResponse } from '@/common/types';

export interface IOrder extends CommonModel {
  id: string;
  amount: number;
  description: string;
  createdBy: string;
  planId: string;
  status: PaymentStatusEnum;
  provider: PaymentProviderEnum;
  expiredAt: string;
  orderCode: number;
  orderData?: OrderData;
}

export type OrderData = {
  accountNumber: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status: string;
  expiredAt: string | null;
  checkoutUrl: string;
  qrCode: string;
};

export enum PaymentStatusEnum {
  Pending,
  Success,
  Failed,
  Cancelled,
}

export enum PaymentMethodEnum {
  CreditCard,
  BankTransfer,
  MoMo,
  PayPal,
  VNPay,
}

export enum PaymentProviderEnum {
  None,
  PayOS,
  ZaloPay,
  MoMo,
  VNPay,
  PayPal,
}

export type GetOrdersResp = IResponse & {
  data: IPagination<IOrder>;
};

export type CreateOrderReq = {
  planId: string;
  returnUrl: string;
  cancelUrl: string;
};

export type CreateOrderResp = IResponse<{
  order: IOrder;
}>;
