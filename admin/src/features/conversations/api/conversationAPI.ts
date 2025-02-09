import * as httpRequest from '@/libs/axios';
import {
  IConversation,
  IConversationCreateMessageRes,
  IConversationItem,
  IConversationListRes,
  IConversationMessagesRes,
  ICreateConversationRes,
  IMessageMetadata,
} from '../types';
import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { getTopics } from '@/features/topic';
import { getEras } from '@/features/era';
import { getArtifacts } from '@/features/artifacts';
import { getPlaces } from '@/features/places';
import { getFigures } from '@/features/figure';
import { getEvents } from '@/features/event';
import { IPagination } from '@/common/types';

export const getConversations = async (): Promise<IConversationItem[]> => {
  try {
    const response: IConversationListRes = await httpRequest.get('/conversations');
    return response.conversations;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getConversation = async (id: string): Promise<IConversation> => {
  try {
    const response = await httpRequest.get(`/conversations/${id}`);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getConversationMessages = async (id: string): Promise<IConversationMessagesRes> => {
  try {
    const response = await httpRequest.get(`/conversations/chat/${id}`);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createConversation = async (conversation: Partial<IConversation>): Promise<ICreateConversationRes> => {
  try {
    const response = await httpRequest.post('/conversations', conversation);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateConversation = async (conversation: IConversation): Promise<IConversation> => {
  try {
    const response = await httpRequest.patch(`/conversations/${conversation.id}`, conversation);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteConversation = async (id: string): Promise<void> => {
  try {
    await httpRequest.remove(`/conversations/${id}`, {});
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createMessageConversation = async (data: {
  conversationId: string;
  message: string;
  metaData?: string;
}): Promise<IConversationCreateMessageRes> => {
  try {
    const res = await httpRequest.post(`/conversations/chat`, data);
    return res;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => getConversations(),
    // enabled: !!data.page || !!data.search || !!data.size,
  });
};

export const useGetConversation = (id?: string) => {
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversation(id!),
    enabled: !!id,
    placeholderData: undefined,
  });
};

export const useGetConversationMessages = (id?: string, isEnable: boolean = true) => {
  return useQuery({
    queryKey: ['conversationMessages', id],
    queryFn: () => getConversationMessages(id!),
    enabled: !!id && isEnable,
    placeholderData: undefined,
  });
};

export const useCreateConversationMutation = (
  options?: UseMutationOptions<ICreateConversationRes, Error, Partial<IConversation>>,
) => {
  return useMutation({
    mutationKey: ['createConversation'],
    mutationFn: createConversation,
    ...options,
  });
};

export const useUpdateConversationMutation = (options?: UseMutationOptions<IConversation, Error, IConversation>) => {
  return useMutation({
    mutationKey: ['updateConversation'],
    mutationFn: updateConversation,
    ...options,
  });
};

export const useDeleteConversationMutation = (options?: UseMutationOptions<void, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteConversation'],
    mutationFn: deleteConversation,
    ...options,
  });
};

export const useGetListRelatedItems = (type: keyof IMessageMetadata, ids: string[]) => {
  return useQuery({
    queryKey: [type, ids],
    queryFn: () => {
      const fetchData = () => {
        switch (type) {
          case 'topic':
            return getTopics({ page: 1, pageSize: 10, ids });
          case 'era':
            return getEras({ page: 1, pageSize: 10, ids });
          case 'artifact':
            return getArtifacts({ page: 1, pageSize: 10, ids });
          case 'place':
            return getPlaces({ page: 1, pageSize: 10, ids });
          case 'figure':
            return getFigures({ page: 1, pageSize: 10, ids });
          case 'event':
            return getEvents({ page: 1, pageSize: 10, ids });
          default:
            throw new Error('Invalid type');
        }
      };
      return fetchData() as Promise<IPagination<any>>;
    },
    // enabled: !!data.page || !!data.search || !!data.size,
  });
};

export const useCreateMessageConversationMutation = (
  options?: UseMutationOptions<
    IConversationCreateMessageRes,
    Error,
    { conversationId: string; message: string; metaData?: string; searchVector?: boolean; searchLimit?: number }
  >,
) => {
  return useMutation({
    mutationKey: ['createMessageConversation'],
    mutationFn: createMessageConversation,
    ...options,
  });
};
