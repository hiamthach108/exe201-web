import { CommonModel } from '@/common/types';

export interface IEvent extends CommonModel {
  id: string;
  name: string;
  brief: string;
  content: string;
  location: string;
  startDate: string;
  endDate: string;
  status: EEventStatus;
  thumbnail: string;
  metadata: string;
}

export enum EEventStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
