import { useAuthStore } from '@/libs/store';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { TbSelector } from 'react-icons/tb';

export default function AccountMenu() {
  const { user, setUser } = useAuthStore();
  return (
    user && (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="h-[60px] w-full p-3 flex border"
            endContent={<TbSelector size={20} className="text-[#A1A1AA]" />}
          >
            <div className="flex gap-2 flex-1">
              <Avatar size="sm" src={user.avatar} />
              <div className="flex flex-col text-left">
                <p className="font-semibold text-small">{user.fullName}</p>
                <p className="text-tiny text-default-400">{user.email}</p>
              </div>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection>
            <DropdownItem className="text-default-500" key={'avatar'}>
              <div className="flex gap-2 flex-1">
                <Avatar size="sm" src={user.avatar} />
                <div className="flex flex-col text-left">
                  <p className="font-semibold text-small">{user.fullName}</p>
                  <p className="text-tiny text-default-400">{user.email}</p>
                </div>
              </div>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem className="text-default-500" key="support">
              Help & Support
            </DropdownItem>
            <DropdownItem
              key="sign-out"
              onClick={() => {
                setUser(null);
                toast.success('You have been signed out');
              }}
              className="text-danger"
              color="danger"
            >
              Sign out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    )
  );
}
