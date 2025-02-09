import { useAppStore } from '@/libs/store';
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useState } from 'react';
import { GiJusticeStar } from 'react-icons/gi';
import { IoIosArrowDown, IoIosCheckmarkCircle } from 'react-icons/io';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { useOverlayTriggerState } from 'react-stately';

export default function HeaderConversation({ defaultModel = 'model3' }: { defaultModel?: string }) {
  const [selectedModel, setSelectedModel] = useState(new Set<string>(defaultModel));
  const modeOverlayState = useOverlayTriggerState({});
  const { isNavExpanded, toggleNav } = useAppStore();
  return (
    <div className="border-b border-divider p-2 relative min-h-14">
      {!isNavExpanded && (
        <Button className="text-default-500" isIconOnly variant="light" onClick={toggleNav}>
          <TbLayoutSidebarRightCollapse size={24} />
        </Button>
      )}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Popover state={modeOverlayState} placement="bottom" offset={24}>
          <PopoverTrigger>
            <button className="flex items-center gap-2 outline-none">
              HISAI v1
              <IoIosArrowDown size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <Listbox
              selectionMode="single"
              selectedKeys={selectedModel}
              onSelectionChange={(e) => {
                setSelectedModel(e as Set<string>);
                modeOverlayState.close();
              }}
              variant="faded"
            >
              <ListboxSection title="Models">
                <ListboxItem
                  selectedIcon={<IoIosCheckmarkCircle size={20} />}
                  description="Newest and most advanced model"
                  key="model3"
                  textValue="HISAI v3"
                  className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
                  classNames={{ selectedIcon: 'w-[20px] h-[20px]' }}
                  startContent={<GiJusticeStar size={20} />}
                >
                  HISAI v3
                </ListboxItem>
                <ListboxItem
                  selectedIcon={<IoIosCheckmarkCircle size={20} />}
                  description="Advanced model for complex tasks"
                  key="model2"
                  textValue="HISAI v2"
                  className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
                  classNames={{ selectedIcon: 'w-[20px] h-[20px]' }}
                  startContent={<GiJusticeStar size={20} />}
                >
                  HISAI v2
                </ListboxItem>
                <ListboxItem
                  selectedIcon={<IoIosCheckmarkCircle size={20} />}
                  description="Newest and most advanced model"
                  key="model1"
                  textValue="HISAI v1"
                  className="text-default-500 data-[hover=true]:text-default-500 px-2 py-[6px]"
                  classNames={{ selectedIcon: 'w-[20px] h-[20px]' }}
                  startContent={<GiJusticeStar size={20} />}
                >
                  HISAI v1
                </ListboxItem>
              </ListboxSection>
            </Listbox>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
