import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { MdAddCircle } from 'react-icons/md';
import HouseTable from '../components/HouseTable';
import { useState } from 'react';
import UpsertHouseModal from '../components/UpsertHouseModal/UpsertHouseModal';
import { IHouse } from '../types';
import { useCreateHouseMutation, useDeleteHouseMutation, useUpdateHouseMutation } from '../api';
import toast from 'react-hot-toast';
import queryClient from '@/libs/tanstack-query';

export default function ManageHouse() {
  const upsertHouseModalState = useDisclosure({ defaultOpen: false });
  const [house, setHouse] = useState<IHouse | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const useUpdateHouse = useUpdateHouseMutation({
    onSuccess: () => {
      upsertHouseModalState.onClose();
      toast.success('Update house success');
      queryClient.invalidateQueries({ queryKey: ['houses'] });
    },
  });

  const useCreateHouse = useCreateHouseMutation({
    onSuccess: async () => {
      upsertHouseModalState.onClose();
      toast.success('Create house success');
      queryClient.invalidateQueries({ queryKey: ['houses'] });
    },
  });

  const useDeleteHouse = useDeleteHouseMutation();

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">House Management</h1>
          {total !== null && <Chip>{total}</Chip>}
        </div>
        <Button
          onClick={() => {
            setHouse(null);
            upsertHouseModalState.onOpen();
          }}
          color="primary"
          endContent={<MdAddCircle size={20} />}
        >
          Add House
        </Button>
      </div>

      <HouseTable
        onChangeData={(data) => setTotal(data.total)}
        onEdit={(data) => {
          setHouse(data);
          upsertHouseModalState.onOpen();
        }}
        onDelete={async (ids) => {
          if (!useDeleteHouse.isPending) {
            try {
              await Promise.all(ids.map((id) => useDeleteHouse.mutateAsync(id)));
              queryClient.invalidateQueries({ queryKey: ['houses'] });
              toast.success('Xóa sự kiện thành công');
            } catch {
              queryClient.invalidateQueries({ queryKey: ['houses'] });
              toast.error('Có lỗi xảy ra trong quá trình xóa sự kiện');
            }
          }
        }}
      />

      <UpsertHouseModal
        data={house}
        state={upsertHouseModalState}
        onSubmitForm={(data, isEdit) => {
          if (isEdit) {
            if (!useUpdateHouse.isPending) useUpdateHouse.mutate({ id: data.id, data });
          } else {
            if (!useCreateHouse.isPending) useCreateHouse.mutate(data);
          }
        }}
      />
    </div>
  );
}
