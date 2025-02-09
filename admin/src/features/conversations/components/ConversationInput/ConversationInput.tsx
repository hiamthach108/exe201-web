import { Button, Textarea, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { TbMessage2Question } from 'react-icons/tb';

export default function ConversationInput({
  onSubmit,
  disabled,
  manageFilterModal,
}: {
  onSubmit: (message: string, clearMessage: () => void) => void;
  disabled?: boolean;
  manageFilterModal: ReturnType<typeof useDisclosure>;
}) {
  const [message, setMessage] = useState('');
  return (
    <Textarea
      disabled={disabled}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message"
      variant="bordered"
      fullWidth
      startContent={
        <Button
          onClick={manageFilterModal.onOpen}
          isIconOnly
          variant="light"
          startContent={<TbMessage2Question size={20} />}
        ></Button>
      }
      endContent={
        <Button
          onPress={() => onSubmit(message, setMessage.bind(null, ''))}
          isIconOnly
          variant="light"
          startContent={<FaArrowCircleUp size={24} />}
        ></Button>
      }
      size="lg"
      maxRows={4}
      minRows={1}
      classNames={{
        innerWrapper: 'items-center text-foreground',
      }}
    />
  );
}
