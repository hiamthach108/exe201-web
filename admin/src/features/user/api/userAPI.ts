import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IUser } from '../types';

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
