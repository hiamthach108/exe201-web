import { IFilterScope, IMessage } from '@/features/conversations';
import { IUser } from '@/features/user';

export interface AppStore {
  isNavExpanded: boolean;
  isFloatingNav: boolean;
  setNavExpanded: (isNavExpanded: boolean) => void;
  setFloatingNav: (isFloatingNav: boolean) => void;
  toggleNav: () => void;
}

export interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  accessToken?: string;
  setAccessToken: (accessToken: string) => void;
  login: (user: IUser) => void;
  logout: () => void;
}

export interface ConversationStore {
  filterScope: Partial<IFilterScope> | null;
  messages: IMessage[];
  setFilterScope: (filterScope: Partial<IFilterScope> | null) => void;
  setMessages: (messages: IMessage[]) => void;
  resetFilter: () => void;
}
