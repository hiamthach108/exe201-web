import { COOKIE_ACCESS_TK, COOKIE_REFRESH_TK, COOKIE_USER_ID } from '@/common/const/auth';
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
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { TbSelector } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export default function AccountMenu() {
  const { user, logout } = useAuthStore();
  const [, , removeCookie] = useCookies([COOKIE_ACCESS_TK, COOKIE_REFRESH_TK, COOKIE_USER_ID]);

  const navigate = useNavigate();

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
                logout();
                removeCookie(COOKIE_ACCESS_TK);
                removeCookie(COOKIE_REFRESH_TK);
                removeCookie(COOKIE_USER_ID);
                navigate('/login');
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
