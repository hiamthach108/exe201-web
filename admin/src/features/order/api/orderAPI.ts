import { IPaginationFilter } from '@/common/types';
import { CreateOrderReq, CreateOrderResp, GetOrdersResp, IOrder } from '../types';
import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

export const getOrders = async (filter: IPaginationFilter<Partial<IOrder>>): Promise<GetOrdersResp> => {
  try {
    const response: GetOrdersResp = await httpRequest.get('/payment/orders/admin', {
      params: filter,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createOrder = async (data: CreateOrderReq): Promise<CreateOrderResp> => {
  try {
    const response = await httpRequest.post('/payment/orders', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateOrder = async (id: string, data: Partial<IOrder>) => {
  try {
    const response = await httpRequest.put(`/orders/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await httpRequest.remove(`/orders/${id}`, {});
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetOrders = (filter: IPaginationFilter<Partial<IOrder>>) => {
  return useQuery({
    queryKey: ['Orders', filter],
    queryFn: () => getOrders(filter),
  });
};

export const useCreateOrderMutation = (options?: UseMutationOptions<any, Error, CreateOrderReq>) => {
  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: createOrder,
    ...options,
  });
};

export const useUpdateOrderMutation = (
  options?: UseMutationOptions<any, Error, { id: string; data: Partial<IOrder> }>,
) => {
  return useMutation({
    mutationKey: ['updateOrder'],
    mutationFn: ({ id, data }) => updateOrder(id, data),
    ...options,
  });
};

export const useDeleteOrderMutation = (options?: UseMutationOptions<any, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteOrder'],
    mutationFn: deleteOrder,
    ...options,
  });
};
