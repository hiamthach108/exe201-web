import {
  Accordion,
  AccordionItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import EraFilterScope from './EraFilterScope';
import TopicFilterScope from './TopicFilterScope';
import { useGetTopic, useGetTopics } from '@/features/topic';
import { useConversationStore } from '@/libs/store';
import { EventFilterScope } from './EventFilterScope';
import { useEffect } from 'react';
import { ArtifactFilterScope } from './ArtifactFilterScope';
import { useGetArtifacts } from '@/features/artifacts';
import FigureFilterScope from './FigureFilterScope';
import { useGetFigures } from '@/features/figure';
import PlaceFilterScope from './PlaceFilterScope';
import { useGetPlaces } from '@/features/places';

export default function MessageFilterScopeModal({
  state,
  portalContainer,
}: {
  state: ReturnType<typeof useDisclosure>;
  portalContainer?: Element;
}) {
  const { topicFilter, artifactFilter, placeFilter, figureFilter, filterScope, setFilterScope, resetFilter } =
    useConversationStore();
  const { data: topics } = useGetTopics({ filter: { ...topicFilter }, pageSize: 10, page: 1 });
  const { data: topicDetail } = useGetTopic(filterScope?.topic);
  const { data: artifactData } = useGetArtifacts({
    filter: { ...artifactFilter, eventId: filterScope?.event, eraId: filterScope?.era },
    page: 1,
    pageSize: 10,
  });
  const { data: figuresData } = useGetFigures({
    filter: { ...figureFilter, eventId: filterScope?.event, eraId: filterScope?.era },
    pageSize: 10,
    page: 1,
  });
  const { data: placesData } = useGetPlaces({
    filter: { ...placeFilter, eventId: filterScope?.event, eraId: filterScope?.era },
    pageSize: 10,
    page: 1,
  });
  useEffect(() => {
    if (topicDetail) {
      setFilterScope({ topic: topicDetail.id });
    }
  }, [setFilterScope, topicDetail]);
  return (
    <Modal
      placement="center"
      portalContainer={portalContainer}
      size="xl"
      isOpen={state.isOpen}
      onOpenChange={state.onOpenChange}
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Chọn phạm vi câu hỏi</ModalHeader>
            <ModalBody>
              <Button
                className="bg-default-foreground text-default-50 h-12 w-fit justify-start mt-2 mb-3 flex-none"
                size="sm"
                onClick={resetFilter}
              >
                Đặt lại tất cả
              </Button>
              <Accordion variant="splitted">
                <AccordionItem title="Chủ đề">
                  <TopicFilterScope topics={topics?.data ?? []} />
                </AccordionItem>

                <AccordionItem title="Niên đại">
                  <EraFilterScope eras={topicDetail?.eras ?? []} />
                </AccordionItem>
                <AccordionItem title="Sự kiện lịch sử">
                  <EventFilterScope events={topicDetail?.events ?? []} />
                </AccordionItem>
                <AccordionItem title="Nhân vật lịch sử">
                  <FigureFilterScope figures={figuresData?.data ?? []} />
                </AccordionItem>
                <AccordionItem title="Di tích lịch sử">
                  <PlaceFilterScope places={placesData?.data ?? []} />
                </AccordionItem>
                <AccordionItem title="Hiện vật lịch sử">
                  <ArtifactFilterScope artifacts={artifactData?.data ?? []} />
                </AccordionItem>
              </Accordion>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
