import { IFilterScope, IMessage } from '@/features/conversations';
import { IEvent } from '@/features/event';
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
  login: (user: IUser) => void;
  logout: () => void;
}

export interface ConversationStore {
  filterScope: Partial<IFilterScope> | null;
  eventFilter: Partial<IEvent> | null;
  messages: IMessage[];
  setFilterScope: (filterScope: Partial<IFilterScope> | null) => void;
  setEventFilter: (eventFilter: Partial<IEvent> | null) => void;
  setMessages: (messages: IMessage[]) => void;
  resetFilter: () => void;
}
