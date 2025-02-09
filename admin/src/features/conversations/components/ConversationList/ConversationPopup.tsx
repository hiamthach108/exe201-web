import { Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { IConversationItem } from '../../types';
import { FaRegShareSquare } from 'react-icons/fa';
import { GoPencil, GoTrash } from 'react-icons/go';
import { BsArchive } from 'react-icons/bs';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { OverlayTriggerProps, useOverlayTriggerState } from 'react-stately';

export default function ConversationPopup({
  conversation,
  ...props
}: { conversation: IConversationItem } & OverlayTriggerProps) {
  const state = useOverlayTriggerState({
    ...props,
    onOpenChange: (isOpen) => {
      if (isOpen) {
        document.getElementById('conversation-' + conversation.id)?.setAttribute('data-popover', 'true');
      } else {
        document.getElementById('conversation-' + conversation.id)?.removeAttribute('data-popover');
      }
      props.onOpenChange?.(isOpen);
    },
  });
  return (
    <Popover placement="bottom" offset={10} state={state}>
      <PopoverTrigger>
        <div className="hidden absolute right-3 top-1/2 -translate-y-1/2 group-hover:block p-2">
          <BiDotsHorizontalRounded size={24} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-1">
        <Listbox variant="faded">
          <ListboxItem
            onClick={() => state.close()}
            key="Share"
            textValue="Share"
            className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
            startContent={<FaRegShareSquare size={20} />}
          >
            Share
          </ListboxItem>
          <ListboxItem
            onClick={() => state.close()}
            key="Rename"
            textValue="Rename"
            className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
            startContent={<GoPencil size={20} />}
          >
            Rename
          </ListboxItem>
          <ListboxItem
            onClick={() => state.close()}
            key="Archive"
            textValue="Archive"
            className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
            startContent={<BsArchive size={20} />}
          >
            Archive
          </ListboxItem>
          <ListboxItem
            onClick={() => state.close()}
            color="danger"
            key="Delete"
            textValue="Delete"
            className="text-danger px-2 py-[6px]"
            startContent={<GoTrash size={20} />}
          >
            Delete
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
