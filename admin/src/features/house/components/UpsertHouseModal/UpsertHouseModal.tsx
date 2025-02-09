import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { HouseStatusEnum, IHouse } from '@/features/house';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function UpsertHouseModal({
  state,
  data,
  onSubmitForm,
}: {
  state: ReturnType<typeof useDisclosure>;
  data: IHouse | null;
  onSubmitForm?: (data: IHouse, isEdit: boolean) => void;
}) {
  const { handleSubmit, register, reset } = useForm<IHouse>({
    defaultValues: { status: HouseStatusEnum.Pending },
  });

  const onSubmit = handleSubmit((dataSubmit) => {
    if (onSubmitForm)
      onSubmitForm(
        {
          ...dataSubmit,
        },
        !!data,
      );
  });

  useEffect(() => {
    if (state.isOpen) {
      if (data)
        reset({
          ...data,
        });
      else setTimeout(() => reset(), 0);
    }
  }, [state.isOpen, data, reset]);

  return (
    <Modal placement="top" size="xl" isOpen={state.isOpen} onOpenChange={state.onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{data ? 'Update House' : 'Create House'}</ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <Input label="Name" {...register('name')} defaultValue={data?.name} />
                  <Textarea label="Description" {...register('description')} defaultValue={data?.description} />
                  <Textarea label="Address" {...register('address')} defaultValue={data?.address} />
                  <Input
                    label="Min Price"
                    type="number"
                    {...register('minPrice')}
                    defaultValue={data?.minPrice?.toString()}
                  />

                  <Input
                    label="Max Price"
                    type="number"
                    {...register('maxPrice')}
                    defaultValue={data?.maxPrice?.toString()}
                  />

                  <Select
                    label="Trạng thái"
                    {...register('status')}
                    defaultSelectedKeys={[data?.status ?? HouseStatusEnum.Pending]}
                  >
                    {Object.values(HouseStatusEnum).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </Select>
                  <Button radius="sm" color="primary" type="submit">
                    {data ? 'Cập nhật' : 'Tạo mới'}
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
