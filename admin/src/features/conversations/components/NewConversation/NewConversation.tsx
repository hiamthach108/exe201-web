import { Logo } from '@/assets/icons';

import { Card, CardBody, useDisclosure } from '@nextui-org/react';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { IoPersonCircle } from 'react-icons/io5';
import { MdAccessTimeFilled, MdTopic } from 'react-icons/md';

export default function NewConversation({
  manageFilterModal,
  fristMessage,
}: {
  manageFilterModal: ReturnType<typeof useDisclosure>;
  fristMessage?: string;
}) {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-6">
      {!fristMessage ? (
        <>
          <Logo styles={{ width: '56px', height: '56px' }} />
          <p className="text-medium text-default-400">
            Chọn phạm vi của câu hỏi để HISVN AI có thể trả lời chính xác hơn
          </p>

          <div className="flex flex-wrap w-full justify-center items-center gap-3">
            <Card onPress={manageFilterModal.onOpen} isPressable className="bg-default-100 max-w-72 py-4 px-5 w-1/4">
              <CardBody className="gap-3 text-medium">
                <MdTopic size={24} className="text-primary-700" />
                <p className="text-default-400">Lựa chọn chủ đề</p>
              </CardBody>
            </Card>
            <Card onPress={manageFilterModal.onOpen} isPressable className="bg-default-100 max-w-72 py-4 px-5 w-1/4">
              <CardBody className="gap-3 text-medium">
                <MdAccessTimeFilled size={24} className="text-secondary-700" />
                <p className="text-default-400">Lựa chọn niên đại</p>
              </CardBody>
            </Card>
            <Card onPress={manageFilterModal.onOpen} isPressable className="bg-default-100 max-w-72 py-4 px-5 w-1/4">
              <CardBody className="gap-3 text-medium">
                <BsFillCalendarEventFill size={24} className="text-success-700" />
                <p className="text-default-400">Lựa chọn sự kiện lịch sử</p>
              </CardBody>
            </Card>
            <Card onPress={manageFilterModal.onOpen} isPressable className="bg-default-100 max-w-72 py-4 px-5 w-1/4">
              <CardBody className="gap-3 text-medium">
                <IoPersonCircle size={24} className="text-warning-700" />
                <p className="text-default-400">Lựa chọn nhân vật lịch sử</p>
              </CardBody>
            </Card>
            <Card
              onPress={manageFilterModal.onOpen}
              isPressable
              className="bg-default-100 max-w-72 py-4 px-5 w-1/4 justify-self-center"
            >
              <CardBody className="gap-3 text-medium">
                <FaMapMarkedAlt size={24} className="text-danger-700" />
                <p className="text-default-400">Lựa chọn di tích lịch sử</p>
              </CardBody>
            </Card>
            <Card
              onPress={manageFilterModal.onOpen}
              isPressable
              className="bg-default-100 max-w-72 py-4 px-5 w-1/4 justify-self-center"
            >
              <CardBody className="gap-3 text-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="24"
                  height="24"
                  x="0"
                  y="0"
                  viewBox="0 0 512.007 512.007"
                  xmlSpace="preserve"
                  className="text-default-700"
                >
                  <g>
                    <path
                      d="M488.357 9.262A14.984 14.984 0 0 0 474.5.004h-106a14.983 14.983 0 0 0-13.857 9.258 14.984 14.984 0 0 0 3.252 16.348C373.627 41.342 376 50.746 376 74.93c0 68.357-9.183 105.174-19.277 136.073h129.542C476.174 180.136 467 143.333 467 75.004c0-24.243 2.373-33.662 18.105-49.395a14.98 14.98 0 0 0 3.252-16.347zM346.758 241.004c-8.65 26.975-15.758 56.232-15.758 105l-.015 3.398c-.117 21.577-.264 52.123 30.688 152.04a14.993 14.993 0 0 0 14.326 10.562h91a14.992 14.992 0 0 0 14.326-10.562C512.19 401.833 512.073 369.456 512 348.684v-2.681c0-48.781-7.121-78.03-15.769-105H346.758zM103.94 181.004h124.12c3.528-11.008 12.166-16.846 29.171-27.891l7.031-4.585c5.522-3.647 8.013-10.488 6.108-16.831s-7.749-10.693-14.37-10.693H76c-6.621 0-12.466 4.351-14.37 10.693s.586 13.184 6.108 16.831l7.031 4.585c17.006 11.045 25.643 16.882 29.171 27.891zM69.291 510.422A15.01 15.01 0 0 0 76 512.004h180a15.01 15.01 0 0 0 6.709-1.582c52.498-26.255 64.576-70.628 67.343-92.584-10.344-3.604-19.521-10.173-25.785-19.568-7.939-11.924-27.1-11.924-35.039 0-9.492 14.238-25.371 22.734-42.48 22.734s-32.988-8.496-42.48-22.734c-3.867-5.801-10.313-9.316-17.241-9.39-3.735-.015-11.997 1.128-18.062 9.756-9.316 13.901-25.166 22.368-42.217 22.368-17.051-1.304-32.988-8.496-42.48-22.734-7.939-11.924-28.1-11.924-36.039 0-6.655 9.98-17.076 16.915-28.229 20.304 1.8 22.967 13.239 63.822 69.291 91.848z"
                      fill="currentColor"
                      opacity="1"
                      data-original="currentColor"
                    ></path>
                    <path
                      d="M1.915 382.337c.225-.298.604-.394.813-.709 9.492-14.238 25.909-22.734 43.019-22.734s33.988 8.496 43.48 22.734c3.97 5.947 10.342 9.36 17.49 9.375h.029c7.134 0 13.506-3.398 17.476-9.331 10.239-14.604 25.649-22.793 42.539-22.793h.63c16.831.19 32.476 8.701 41.836 22.749 7.939 11.924 27.1 11.924 35.039 0a50.948 50.948 0 0 1 42.48-22.734c16.577 0 31.879 8.099 41.455 21.544-7.474-36.482-30.02-61.329-52.207-85.294-22.711-24.536-44.247-47.91-48.975-84.141h-122.05c-4.768 36.022-26.369 59.696-49.14 84.536-22.436 24.486-46.809 49.846-53.914 86.798z"
                      fill="currentColor"
                      opacity="1"
                      data-original="currentColor"
                    ></path>
                  </g>
                </svg>

                <p className="text-default-400">Lựa chọn hiện vật lịch sử</p>
              </CardBody>
            </Card>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
