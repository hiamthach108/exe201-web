import { IConversationItem } from '@/features/conversations';
import { Listbox, ListboxItem, ScrollShadow } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import ConversationPopup from './ConversationPopup';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/libs/store';

export default function ConversationList({
  conversationList,
  selectedConversation,
}: {
  conversationList: IConversationItem[];
  selectedConversation?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { isFloatingNav, setNavExpanded } = useAppStore();

  useEffect(() => {
    if (selectedConversation && ref.current) {
      const selectedElement = ref.current.querySelector(`#conversation-${selectedConversation}`) as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }, [selectedConversation, ref]);

  return (
    <div className="text-small w-full">
      <ScrollShadow ref={ref} hideScrollBar className="max-h-full h-full pb-5">
        <Listbox classNames={{ list: 'gap-1' }}>
          {conversationList.map((conversation) => (
            <ListboxItem
              id={'conversation-' + conversation.id}
              classNames={{
                base: twMerge(
                  'p-0 text-default-500 data-[popover=true]:transition-colors data-[popover=true]:bg-default data-[popover=true]:text-default-foreground ',
                  selectedConversation === conversation.id ? 'text-default-foreground bg-default' : '',
                ),
              }}
              hideSelectedIcon={true}
              key={conversation.id}
              textValue={conversation.name}
              endContent={<ConversationPopup conversation={conversation} />}
            >
              <Link
                onClick={() => {
                  if (isFloatingNav) {
                    setNavExpanded(false);
                  }
                }}
                className="w-full p-3 block"
                to={`/conversations/${conversation.id}`}
              >
                {conversation.name}
              </Link>
            </ListboxItem>
          ))}
        </Listbox>
      </ScrollShadow>
    </div>
  );
}
