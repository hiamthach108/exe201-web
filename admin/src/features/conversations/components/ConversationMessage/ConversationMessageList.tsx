import { useConversationStore } from '@/libs/store';
import ConversationMessageAI from './ConversationMessageAI';
import ConversationMessageUser from './ConversationMessageUser';
import { ScrollShadow } from '@nextui-org/react';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useRef } from 'react';

export default function ConversationMessageList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages } = useConversationStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ScrollShadow ref={scrollRef} className="w-full h-full max-h-full px-12 py-8">
      <div className="flex flex-1 flex-col gap-y-4 w-full">
        {messages.map((message) => (
          <Fragment key={message.id}>
            {message.metadata?.isBot ? (
              <ConversationMessageAI message={message} />
            ) : (
              <ConversationMessageUser message={message} />
            )}
          </Fragment>
        ))}
      </div>
    </ScrollShadow>
  );
}
