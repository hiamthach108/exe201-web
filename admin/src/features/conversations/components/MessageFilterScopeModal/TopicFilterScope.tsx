import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/Carousel';
import { ITopic } from '@/features/topic';
import { useConversationStore } from '@/libs/store';
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { IoIosSearch } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';
export default function TopicFilterScope({ topics }: { topics: ITopic[] }) {
  const { topicFilter, setTopicFilter, filterScope, setFilterScope } = useConversationStore();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Input
          value={topicFilter?.name}
          onChange={(e) => setTopicFilter({ ...topicFilter, name: e.target.value })}
          className="w-fit"
          placeholder="Tìm kiếm chủ đề"
          size="sm"
          endContent={<IoIosSearch size={16} className="text-default-400" />}
        />
      </div>
      <Carousel>
        <CarouselContent>
          {topics.map((topic) => (
            <CarouselItem key={topic.id} className="flex flex-col items-center justify-between gap-2 basis-1/2">
              <Card
                className={twMerge(
                  'w-full h-full border-2',
                  filterScope?.topic === topic.id ? ' border-blue-500' : 'border-transparent',
                )}
                shadow="sm"
                isPressable
                onPress={() => setFilterScope({ ...filterScope, topic: topic.id })}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={topic.name}
                    className="w-full object-cover h-[140px]"
                    src={topic.thumbnail}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{topic.name}</b>
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
