import { IPaginationFilter } from '@/common/types';
import { GetHousesResp, IHouse } from '../types';
import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

export const getHouses = async (filter: IPaginationFilter<Partial<IHouse>>): Promise<GetHousesResp> => {
  try {
    const response: GetHousesResp = await httpRequest.get('/houses/admin', {
      params: filter,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createHouse = async (data: Partial<IHouse>) => {
  try {
    const response = await httpRequest.post('/houses', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateHouse = async (id: string, data: Partial<IHouse>) => {
  try {
    const response = await httpRequest.put(`/houses/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteHouse = async (id: string) => {
  try {
    const response = await httpRequest.remove(`/houses/${id}`, {});
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetHouses = (filter: IPaginationFilter<Partial<IHouse>>) => {
  return useQuery({
    queryKey: ['Houses', filter],
    queryFn: () => getHouses(filter),
  });
};

export const useCreateHouseMutation = (options?: UseMutationOptions<any, Error, Partial<IHouse>>) => {
  return useMutation({
    mutationKey: ['createHouse'],
    mutationFn: createHouse,
    ...options,
  });
};

export const useUpdateHouseMutation = (
  options?: UseMutationOptions<any, Error, { id: string; data: Partial<IHouse> }>,
) => {
  return useMutation({
    mutationKey: ['updateHouse'],
    mutationFn: ({ id, data }) => updateHouse(id, data),
    ...options,
  });
};

export const useDeleteHouseMutation = (options?: UseMutationOptions<any, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteHouse'],
    mutationFn: deleteHouse,
    ...options,
  });
};
