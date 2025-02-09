import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/Carousel';
import { IPlace } from '@/features/places';
import { useConversationStore } from '@/libs/store';
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { IoIosSearch } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export default function PlaceFilterScope({ places }: { places: IPlace[] }) {
  const { placeFilter, setPlaceFilter, filterScope, setFilterScope } = useConversationStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Input
          value={placeFilter?.name}
          onChange={(e) => setPlaceFilter({ ...placeFilter, name: e.target.value })}
          className="w-fit"
          placeholder="Tìm kiếm chủ đề"
          size="sm"
          endContent={<IoIosSearch size={16} className="text-default-400" />}
        />
      </div>
      <Carousel>
        <CarouselContent>
          {places.map((place) => (
            <CarouselItem key={place.id} className="flex flex-col items-center justify-between gap-2 basis-1/2">
              <Card
                className={twMerge(
                  'w-full h-full border-2',
                  filterScope?.place === place.id ? ' border-blue-500' : 'border-transparent',
                )}
                shadow="sm"
                isPressable
                onPress={() => setFilterScope({ ...filterScope, place: place.id })}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={place.name}
                    className="w-full object-cover h-[140px]"
                    src={place?.thumbnail}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{place.name}</b>
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
