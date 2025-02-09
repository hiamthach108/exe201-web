import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/Carousel';
import { IFigure } from '@/features/figure';
import { useConversationStore } from '@/libs/store';
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { IoIosSearch } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export default function FigureFilterScope({ figures }: { figures: IFigure[] }) {
  const { figureFilter, setFigureFilter, filterScope, setFilterScope } = useConversationStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Input
          value={figureFilter?.name}
          onChange={(e) => setFigureFilter({ ...figureFilter, name: e.target.value })}
          className="w-fit"
          placeholder="Tìm kiếm chủ đề"
          size="sm"
          endContent={<IoIosSearch size={16} className="text-default-400" />}
        />
      </div>
      <Carousel>
        <CarouselContent>
          {figures.map((figure) => (
            <CarouselItem key={figure.id} className="flex flex-col items-center justify-between gap-2 basis-1/2">
              <Card
                className={twMerge(
                  'w-full h-full border-2',
                  filterScope?.figure === figure.id ? ' border-blue-500' : 'border-transparent',
                )}
                shadow="sm"
                isPressable
                onPress={() => setFilterScope({ ...filterScope, figure: figure.id })}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={figure.name}
                    className="w-full object-cover h-[140px]"
                    src={figure?.thumbnail}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{figure.name}</b>
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
