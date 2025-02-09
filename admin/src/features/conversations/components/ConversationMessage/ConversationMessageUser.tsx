import { useAuthStore } from '@/libs/store';
import { Avatar } from '@nextui-org/react';
import { IMessage } from '@/features/conversations';
import dayjs from 'dayjs';

export default function ConversationMessageUser({ message }: { message: IMessage }) {
  const { user } = useAuthStore();
  return (
    <div className="flex w-full gap-x-3 items-start justify-end">
      <div className="flex flex-col">
        <div className="flex gap-x-2 items-center justify-end">
          <div className="text-xs text-default-400">{dayjs(message.createdAt).format('HH:mm')}</div>
          <div className="text-sm font-semibold text-default-500">{user?.fullName}</div>
        </div>
        <div className="relative w-full rounded-medium px-4 py-3 bg-content3 text-content3-foreground">
          {message.content}
        </div>
      </div>
      <div className="flex-shrink-0">
        <Avatar src={user?.avatar} alt="avatar_user" size="sm" />
      </div>
    </div>
  );
}
