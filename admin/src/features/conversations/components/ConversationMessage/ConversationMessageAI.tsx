import { IMessage } from '@/features/conversations';
import { Avatar } from '@nextui-org/react';
import dayjs from 'dayjs';
import { marked } from 'marked';

export default function ConversationMessageAI({ message }: { message: Partial<IMessage> }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full gap-x-3 items-start justify-start">
        <div className="flex-shrink-0">
          <Avatar src="/images/avatar_ai.png" alt="avatar_ai" size="sm" />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-x-2 items-center">
            <div className="text-sm font-semibold text-default-500">AI</div>
            <div className="text-xs text-default-400">{dayjs(message.createdAt).format('HH:mm')}</div>
          </div>
          {!message.metadata?.pending ? (
            <div className="flex flex-col gap-y-4">
              <div
                className="relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600"
                dangerouslySetInnerHTML={{ __html: marked(message.content || '', { breaks: true }) }}
              ></div>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="dot animate-bounce delay-200">.</span>
              <span className="dot animate-bounce delay-300">.</span>
              <span className="dot animate-bounce delay-400">.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
