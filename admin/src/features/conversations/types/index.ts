import { CommonModel, IResponse } from '@/common/types';

export interface IConversation extends CommonModel {
  id: string;
  name: string;
  thumbnail: string;
  metadata: string;
  messages: IMessage[];
}

export type IConversationItem = Omit<IConversation, 'messages'>;

export interface IMessageMetadata {
  topic?: string[];
  era?: string[];
  artifact?: string[];
  place?: string[];
  figure?: string[];
  event?: string[];
  isBot?: boolean;
  pending?: boolean;
}

export interface IMessage extends CommonModel {
  id: string;
  content: string;
  metadata: IMessageMetadata;
  conversationId?: string;
}

export interface IConversationFilter {
  name?: string;
  metadata?: string;
}

export interface IConversationListRes extends IResponse {
  conversations: IConversationItem[];
}

export interface IFilterScope {
  topic: string;
  era: string;
  artifact: string;
  place: string;
  figure: string;
  event: string;
}

export interface ICreateConversationRes extends IResponse {
  conversation: IConversation;
}

export interface IConversationMessagesRes extends IResponse {
  messages: IMessage[];
}

export interface IConversationCreateMessageRes extends IResponse {
  metadata: IMessageMetadata;
  result: {
    count: number;
  };
}
