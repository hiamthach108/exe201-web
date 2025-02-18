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
}


export enum PaymentStatusEnum
{
  Pending,
  Success,
  Failed,
  Cancelled
}

export enum PaymentMethodEnum
{
  CreditCard,
  BankTransfer,
  MoMo,
  PayPal,
  VNPay
}

export enum PaymentProviderEnum
{
  None,
  PayOS,
  ZaloPay,
  MoMo,
  VNPay,
  PayPal
}

export type GetOrdersResp = IResponse & {
  data: IPagination<IOrder>;
};
