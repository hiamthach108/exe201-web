import { CommonModel, IPagination, IResponse } from '@/common/types';

export interface IHouse extends CommonModel {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  minPrice: number;
  maxPrice: number;
  rating: number;
  totalRooms: number;
  metadata: string;
  status: HouseStatusEnum;
}

export enum HouseStatusEnum {
  Pending,
  Approved,
  Rejected,
  Deleted,
  Archived,
}

export type GetHousesResp = IResponse & {
  data: IPagination<IHouse>;
};
