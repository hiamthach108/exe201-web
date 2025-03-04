import { IResponse } from '@/common/types';

export type GetOverviewResp = IResponse & {
  data: {
    totalUsers: number;
    totalRevenue: number;
    totalHouses: number;
    totalSubscriptions: number;
  };
};
