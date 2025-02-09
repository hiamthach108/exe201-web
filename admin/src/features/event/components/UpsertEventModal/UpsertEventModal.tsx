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
import { EEventStatus, IEvent } from '@/features/event';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export default function UpsertEventModal({
  state,
  data,
  onSubmitForm,
}: {
  state: ReturnType<typeof useDisclosure>;
  data: IEvent | null;
  onSubmitForm?: (data: IEvent, isEdit: boolean) => void;
}) {
  const { handleSubmit, register, reset } = useForm<IEvent>({
    defaultValues: { status: EEventStatus.PENDING },
  });

  const onSubmit = handleSubmit((dataSubmit) => {
    if (onSubmitForm)
      onSubmitForm(
        {
          ...dataSubmit,
          startDate: dayjs(dataSubmit.startDate).toISOString(),
          endDate: dayjs(dataSubmit.endDate).toISOString(),
        },
        !!data,
      );
  });

  useEffect(() => {
    if (state.isOpen) {
      if (data)
        reset({
          ...data,
          startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
        });
      else setTimeout(() => reset(), 0);
    }
  }, [state.isOpen, data, reset]);

  return (
    <Modal placement="top" size="xl" isOpen={state.isOpen} onOpenChange={state.onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{data ? 'Cập nhật sự kiện' : 'Tạo sự kiện mới'}</ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <Input label="Tên sự kiện" {...register('name')} defaultValue={data?.name} />
                  <Textarea label="Tóm tắt" {...register('brief')} defaultValue={data?.brief} />
                  <Textarea label="Nội dung" {...register('content')} defaultValue={data?.content} />
                  <Input label="Địa điểm" {...register('location')} defaultValue={data?.location} />
                  <Input
                    type="datetime-local"
                    label="Ngày bắt đầu"
                    {...register('startDate')}
                    defaultValue={data?.startDate}
                  />
                  <Input
                    type="datetime-local"
                    label="Ngày kết thúc"
                    {...register('endDate')}
                    defaultValue={data?.endDate}
                  />
                  <Select
                    label="Trạng thái"
                    {...register('status')}
                    defaultSelectedKeys={[data?.status ?? EEventStatus.PENDING]}
                  >
                    {Object.values(EEventStatus).map((option) => (
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
