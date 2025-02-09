import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/Carousel';
import { IMessage, IMessageMetadata, useGetListRelatedItems } from '@/features/conversations';
import { Avatar, Card, CardBody, CardFooter, Image, Tab, Tabs } from '@nextui-org/react';
import dayjs from 'dayjs';
import { marked } from 'marked';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const TabItem = ({ type, idList }: { type: string; idList: string[] }) => {
  const { data: dataList } = useGetListRelatedItems(type as keyof IMessageMetadata, idList);
  const dataMapping: any[] = useMemo(
    () =>
      dataList?.data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.thumbnail ?? item.metadata,
      })) ?? [],
    [dataList],
  );
  return (
    <Carousel>
      <CarouselContent>
        {dataMapping.map((data: any) => (
          <CarouselItem key={data.id} className="flex flex-col items-center justify-between gap-2 basis-1/4">
            <Card className={twMerge('w-full h-full border-2')} shadow="sm" isPressable>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  height={200}
                  alt={data.name}
                  className="w-full object-cover"
                  src={data.image}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{data.name}</b>
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
  );
};

export default function ConversationMessageAI({ message }: { message: Partial<IMessage> }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isBot, pending, ...tab } = { ...message.metadata };
  const items = useMemo(() => Object.entries(tab).map(([key, value]) => ({ title: key, data: value })), [tab]);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full gap-x-3 items-start justify-start">
        <div className="flex-shrink-0">
          <Avatar src="/images/avatar_ai.png" alt="avatar_ai" size="sm" />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-x-2 items-center">
            <div className="text-sm font-semibold text-default-500">HISVN AI</div>
            <div className="text-xs text-default-400">{dayjs(message.createdAt).format('HH:mm')}</div>
          </div>
          {!message.metadata?.pending ? (
            <div className="flex flex-col gap-y-4">
              <div
                className="relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600"
                dangerouslySetInnerHTML={{ __html: marked(message.content || '', { breaks: true }) }}
              ></div>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="dot animate-bounce delay-200">.</span>
              <span className="dot animate-bounce delay-300">.</span>
              <span className="dot animate-bounce delay-400">.</span>
            </div>
          )}
        </div>
      </div>
      <Tabs items={items}>
        {({ title, data }) => (
          <Tab key={title} title={title}>
            <TabItem key={title} type={title} idList={data} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
