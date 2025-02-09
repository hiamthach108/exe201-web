import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IGoogleAuthUrlResponse, IRefreshTokenRequest, IRefreshTokenResponse, IVerifyTokenResponse } from '../types';
import Cookies from 'js-cookie';
import { AuthEnum } from '@/common/enum/auth';
import { COOKIE_ACCESS_TK, COOKIE_REFRESH_TK, COOKIE_USER_ID } from '@/common/const/auth';
export const getGoogleAuthUrl = async (redirect: string): Promise<IGoogleAuthUrlResponse> => {
  try {
    const response = await httpRequest.post('/auth/login', {
      redirect,
      authType: AuthEnum.GOOGLE,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const verifyToken = async (localToken: string): Promise<IVerifyTokenResponse> => {
  try {
    const response: IVerifyTokenResponse = await httpRequest.get('/auth/verify-token', {
      params: { token: localToken },
    });
    console.log('response', response);
    Cookies.set(COOKIE_USER_ID, response.data.userId, { expires: new Date(response.data.refreshTokenExpAt * 1000) });
    Cookies.set(COOKIE_ACCESS_TK, response.data.accessToken, {
      expires: new Date(response.data.accessTokenExpAt * 1000),
    });
    Cookies.set(COOKIE_REFRESH_TK, response.data.refreshToken, {
      expires: new Date(response.data.refreshTokenExpAt * 1000),
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const refreshToken = async (data: IRefreshTokenRequest): Promise<IRefreshTokenResponse> => {
  try {
    const response = await httpRequest.post('/auth/refresh', data);

    Cookies.set(COOKIE_ACCESS_TK, response.data.accessToken, {
      expires: new Date(response.data.accessTokenExpAt * 1000),
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const logout = async (userId: string): Promise<boolean> => {
  try {
    const response = await httpRequest.post(`/auth/force-logout?userId=${userId}`);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetGoogleAuthUrlMutation = (
  options?: UseMutationOptions<IGoogleAuthUrlResponse, unknown, string, unknown>,
) => {
  return useMutation({
    mutationKey: ['getGoogleAuthUrl'],
    mutationFn: getGoogleAuthUrl,
    ...options,
  });
};

export const useVerifyTokenMutation = (
  options?: UseMutationOptions<IVerifyTokenResponse, unknown, string, unknown>,
) => {
  return useMutation({
    mutationKey: ['verifyToken'],
    mutationFn: verifyToken,
    ...options,
  });
};

export const useRefreshTokenMutation = (
  options?: UseMutationOptions<IRefreshTokenResponse, unknown, IRefreshTokenRequest, unknown>,
) => {
  return useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: refreshToken,
    ...options,
  });
};

export const useLogoutMutation = (options?: UseMutationOptions<boolean, unknown, string, unknown>) => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    ...options,
  });
};
