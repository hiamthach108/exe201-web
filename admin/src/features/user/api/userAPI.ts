import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { IUser } from '../types';
import { IPagination, IPaginationFilter } from '@/common/types';

export const getUsers = async (filter: IPaginationFilter<Partial<IUser>>): Promise<IPagination<IUser>> => {
  try {
    const response = await httpRequest.get('/users', {
      params: filter,
    });
    return response.data;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetUsers = (filter: IPaginationFilter<Partial<IUser>>) => {
  return useQuery({
    queryKey: ['users', filter],
    queryFn: () => getUsers(filter),
  });
};

export const getUserProfile = async (): Promise<{
  data: IUser;
}> => {
  try {
    const response = await httpRequest.get('/users/profile');
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetUserProfileMutation = (options?: UseMutationOptions<any, unknown, void, unknown>) => {
  return useMutation({
    mutationKey: ['getUserProfile'],
    mutationFn: getUserProfile,
    ...options,
  });
};
