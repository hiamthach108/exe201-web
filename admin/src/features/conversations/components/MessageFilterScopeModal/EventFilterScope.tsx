import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/Carousel';
import { IEvent } from '@/features/event';
import { useConversationStore } from '@/libs/store';
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { IoIosSearch } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export function EventFilterScope({ events }: { events: IEvent[] }) {
  const { eventFilter, setEventFilter, filterScope, setFilterScope } = useConversationStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Input
          value={eventFilter?.name}
          onChange={(e) => setEventFilter({ ...eventFilter, name: e.target.value })}
          className="w-fit"
          placeholder="Tìm kiếm chủ đề"
          size="sm"
          endContent={<IoIosSearch size={16} className="text-default-400" />}
        />
      </div>
      <Carousel>
        <CarouselContent>
          {events
            .filter((event) => !eventFilter?.name || event.name.toLowerCase().includes(eventFilter.name.toLowerCase()))
            .map((event) => (
              <CarouselItem key={event.id} className="flex flex-col items-center justify-between gap-2 basis-1/2">
                <Card
                  className={twMerge(
                    'w-full h-full border-2',
                    filterScope?.event === event.id ? ' border-blue-500' : 'border-transparent',
                  )}
                  shadow="sm"
                  isPressable
                  onPress={() => setFilterScope({ ...filterScope, event: event.id })}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={event.name}
                      className="w-full object-cover h-[140px]"
                      src={event?.thumbnail ?? event.metadata}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{event.name}</b>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="pt-4 flex gap-3">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
