import { UserStatusEnum } from '@/common/enum/user';

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  phone: string;
  roleId: string;
  status: UserStatusEnum;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}
