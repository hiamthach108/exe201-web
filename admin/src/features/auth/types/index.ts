import { IResponse } from '@/common/types';

export interface IGoogleAuthUrlResponse extends IResponse {
  data: {
    token: string;
    redirectLink: string;
  };
}

export interface IVerifyTokenResponse extends IResponse {
  data: {
    userId: string;
    sessionId: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpAt: number;
    refreshTokenExpAt: number;
  };
}

export interface IRefreshTokenRequest {
  userId: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse extends IResponse {
  data: {
    accessToken: string;
    accessTokenExpAt: number;
  };
}
