import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { MdAddCircle } from 'react-icons/md';
import EventTable from '../components/EventTable'; 
import { useState } from 'react';
import UpsertEventModal from '../components/UpsertEventModal/UpsertEventModal'; 
import { IEvent } from '../types'; 
import { 
  useCreateEventMutation, 
  useDeleteEventMutation, 
  useUpdateEventMutation 
} from '../api'; 
import toast from 'react-hot-toast';
import queryClient from '@/libs/tanstack-query';

export default function ManageEvent() { 
  const upsertEventModalState = useDisclosure({ defaultOpen: false });
  const [event, setEvent] = useState<IEvent | null>(null); 
  const [total, setTotal] = useState<number | null>(null);

  const useUpdateEvent = useUpdateEventMutation({
    onSuccess: () => {
      upsertEventModalState.onClose();
      toast.success('Cập nhật sự kiện thành công'); 
      queryClient.invalidateQueries({ queryKey: ['events'] }); 
    },
  });

  const useCreateEvent = useCreateEventMutation({
    onSuccess: async () => {
      upsertEventModalState.onClose();
      toast.success('Tạo sự kiện thành công');
      queryClient.invalidateQueries({ queryKey: ['events'] }); 
    },
  });

  const useDeleteEvent = useDeleteEventMutation(); 

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">Danh sách sự kiện</h1> 
          {total !== null && <Chip>{total}</Chip>}
        </div>
        <Button
          onClick={() => {
            setEvent(null);
            upsertEventModalState.onOpen();
          }}
          color="primary"
          endContent={<MdAddCircle size={20} />}
        >
          Thêm sự kiện
        </Button>
      </div>

      <EventTable
        onChangeData={(data) => setTotal(data.total)} 
        onEdit={(data) => {
          setEvent(data); 
          upsertEventModalState.onOpen();
        }}
        onDelete={async (ids) => {
          if (!useDeleteEvent.isPending) {
            try {
              await Promise.all(ids.map((id) => useDeleteEvent.mutateAsync(id)));
              queryClient.invalidateQueries({ queryKey: ['events'] }); 
              toast.success('Xóa sự kiện thành công'); 
            } catch {
              queryClient.invalidateQueries({ queryKey: ['events'] }); 
              toast.error('Có lỗi xảy ra trong quá trình xóa sự kiện'); 
            }
          }
        }}
      />

      <UpsertEventModal
        data={event} 
        state={upsertEventModalState}
        onSubmitForm={(data, isEdit) => {
          if (isEdit) {
            if (!useUpdateEvent.isPending) useUpdateEvent.mutate({ id: data.id, data });
          } else {
            if (!useCreateEvent.isPending) useCreateEvent.mutate(data);
          }
        }}
      />
    </div>
  );
}
