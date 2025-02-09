import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateConversationMutation,
  useCreateMessageConversationMutation,
  useGetConversation,
  useGetConversationMessages,
} from '@/features/conversations';
import { useEffect, useState } from 'react';
import ConversationMessageList from '../ConversationMessage';
import ConversationInput from '../ConversationInput';
import NewConversation from '../NewConversation';
import { Spinner, useDisclosure } from '@nextui-org/react';
import MessageFilterScopeModal from '../MessageFilterScopeModal';
import { useAuthStore, useConversationStore } from '@/libs/store';
import { v4 as uuidv4 } from 'uuid';
import queryClient from '@/libs/tanstack-query';

export default function ConversationDetail() {
  const { conversationId } = useParams();
  const { user } = useAuthStore();
  const { messages, setMessages, filterScope } = useConversationStore();
  const navigate = useNavigate();
  const [isCreateNew, setIsCreateNew] = useState(false);
  const manageFilterModal = useDisclosure({ defaultOpen: false });
  const createConversationMutation = useCreateConversationMutation({
    onSuccess: async ({ conversation }) => {
      setIsCreateNew(true);
      await queryClient.invalidateQueries({ queryKey: ['conversations'] });
      navigate('/conversations/' + conversation.id);
      setMessages([{ ...messages[0], conversationId: conversation.id }]);
      createMessageConversationMutation.mutate({
        conversationId: conversation.id,
        message: messages[0].content,
        metaData: JSON.stringify(filterScope),
        searchVector: true,
        searchLimit: 10,
      });
    },
    onError: () => {
      console.log('onError');
    },
  });
  const createMessageConversationMutation = useCreateMessageConversationMutation({
    onMutate: (variables) => {
      setMessages([
        ...messages,
        {
          content: '',
          id: uuidv4(),
          metadata: {
            isBot: true,
            pending: true,
          },
          conversationId: variables.conversationId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'bot',
          updatedBy: 'bot',
        },
      ]);
    },
    onSuccess: (data, variables) => {
      if (isCreateNew) {
        setIsCreateNew(false);
      }
      setMessages([
        ...messages.slice(0, -1),
        {
          content: data.message,
          id: uuidv4(),
          metadata: data.metadata,
          conversationId: variables.conversationId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'bot',
          updatedBy: 'bot',
        },
      ]);
    },
    onError: () => {
      console.log('onError');
    },
  });
  const { isLoading: isConversationDetailLoading } = useGetConversation(conversationId);
  const { data: conversationMessageList } = useGetConversationMessages(conversationId, !isCreateNew);

  useEffect(() => {
    setMessages(conversationMessageList?.messages ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationMessageList]);

  useEffect(() => {
    if (conversationId && messages.length == 0) {
      setIsCreateNew(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  return (
    <div className="w-full h-full flex flex-col border border-divider rounded-xl pb-3 text-small text-default-400">
      {/* <HeaderConversation /> */}
      <div className="px-6 flex flex-col gap-6 justify-center items-center flex-1 overflow-hidden">
        <div></div>
        {conversationId || messages.length ? (
          isConversationDetailLoading && !isCreateNew ? (
            <Spinner className="flex items-center justify-center w-full h-full" size="lg" color="warning"></Spinner>
          ) : (
            <ConversationMessageList />
          )
        ) : (
          // <ConversationMessageList />
          <NewConversation manageFilterModal={manageFilterModal} />
        )}
        <div className="flex flex-col gap-3 w-full items-center">
          <ConversationInput
            manageFilterModal={manageFilterModal}
            disabled={createConversationMutation.isPending || createMessageConversationMutation.isPending}
            onSubmit={(message, clearMessage) => {
              if (conversationId) {
                createMessageConversationMutation.mutate({
                  conversationId,
                  message,
                  metaData: JSON.stringify(filterScope),
                  searchVector: true,
                  searchLimit: 10,
                });
                setMessages([
                  ...messages,
                  {
                    content: message,
                    id: uuidv4(),
                    metadata: {},
                    conversationId,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    createdBy: user!.id,
                    updatedBy: user!.id,
                  },
                ]);
              } else {
                createConversationMutation.mutate({});
                setMessages([
                  {
                    content: message,
                    id: uuidv4(),
                    metadata: {},
                    conversationId: '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    createdBy: user!.id,
                    updatedBy: user!.id,
                  },
                ]);
              }
              clearMessage();
            }}
          />
          <p className="font-medium">HISVN AI có khả năng nhầm lẫn. Hãy kiểm tra kỹ thông tin.</p>
        </div>
      </div>
      <MessageFilterScopeModal state={manageFilterModal} />
    </div>
  );
}
