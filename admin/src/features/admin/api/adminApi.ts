import httpRequest from '@/libs/axios';
import { GetGrowthsResp, GetOverviewResp } from '../types';

export const getOverview = async (): Promise<GetOverviewResp> => {
  try {
    const response: GetOverviewResp = await httpRequest.get('/analytics/overview');
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getRevenueGrowth = async (): Promise<GetGrowthsResp> => {
  try {
    const response = await httpRequest.get<GetGrowthsResp>('/analytics/revenue-growth');
    return response.data;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getUserGrowth = async (): Promise<GetGrowthsResp> => {
  try {
    const response = await httpRequest.get<GetGrowthsResp>('/analytics/user-growth');
    return response.data;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getRevenuePerformance = async (): Promise<GetGrowthsResp> => {
  try {
    const response = await httpRequest.get<GetGrowthsResp>('/analytics/revenue-performance');
    return response.data;
  } catch (error) {
    throw new Error(error as any);
  }
};
