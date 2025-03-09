import { IResponse } from '@/common/types';

export type GetOverviewResp = IResponse & {
  data: {
    totalUsers: number;
    totalRevenue: number;
    totalHouses: number;
    totalSubscriptions: number;
  };
};

export type GetGrowthsResp = IResponse<{
  timeUnit: 'day' | 'week' | 'month';
  data: {
    period: string;
    value: number;
  }[];
}>;
