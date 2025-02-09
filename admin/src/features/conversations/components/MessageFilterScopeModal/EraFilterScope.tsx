import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/Carousel';
import { IEra } from '@/features/era';
import { useConversationStore } from '@/libs/store';
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { IoIosSearch } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export default function EraFilterScope({ eras }: { eras: IEra[] }) {
  const { eraFilter, setEraFilter, filterScope, setFilterScope } = useConversationStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Input
          value={eraFilter?.name}
          onChange={(e) => setEraFilter({ ...eraFilter, name: e.target.value })}
          className="w-fit"
          placeholder="Tìm kiếm niên đại"
          size="sm"
          endContent={<IoIosSearch size={16} className="text-default-400" />}
        />
      </div>
      <Carousel>
        <CarouselContent>
          {eras
            .filter((era) => !eraFilter?.name || era.name.toLowerCase().includes(eraFilter.name.toLowerCase()))
            .map((era) => (
              <CarouselItem key={era.id} className="flex flex-col items-center justify-between gap-2 basis-1/2">
                <Card
                  className={twMerge(
                    'w-full h-full border-2',
                    filterScope?.era === era.id ? ' border-blue-500' : 'border-transparent',
                  )}
                  shadow="sm"
                  isPressable
                  onPress={() => setFilterScope({ ...filterScope, era: era.id })}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={era.name}
                      className="w-full object-cover h-[140px]"
                      src={era.thumbnail}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{era.name}</b>
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
