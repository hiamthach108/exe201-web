import NavBar from '@/layouts/components/NavBar';
import { useAppStore } from '@/libs/store';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import ConversationList from '../ConversationList';
import { useGetConversations } from '@/features/conversations';
import { useNavigate, useParams } from 'react-router-dom';
import { useMedia } from 'react-use';

export default function ConversationNav() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { conversationId } = useParams();
  const { isNavExpanded, isFloatingNav, setNavExpanded, setFloatingNav } = useAppStore();
  const isSmallScreen = useMedia('(max-width: 768px)');
  const { data: conversations } = useGetConversations();

  useEffect(() => {
    setNavExpanded(!isSmallScreen);
    setFloatingNav(isSmallScreen);
  }, [isSmallScreen, setNavExpanded, setFloatingNav]);

  useEffect(() => {
    if (isNavExpanded) {
      setIsTransitioning(true);
    } else {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match the duration of the CSS transition
      return () => clearTimeout(timer);
    }
  }, [isNavExpanded]);

  return (
    <div
      className={twMerge(
        'h-full transition-size overflow-x-hidden',
        isFloatingNav ? 'absolute top-0 z-10' : '',
        isNavExpanded ? 'w-72' : 'w-0',
      )}
    >
      <div
        className={twMerge(
          'absolute inset-0 w-72 transition-all',
          isNavExpanded ? 'opacity-100' : 'opacity-0',
          !isTransitioning && !isNavExpanded ? 'invisible' : 'visible',
        )}
      >
        <NavBar>
          <Button
            className="bg-default-foreground text-default-50 h-12 w-full justify-start mt-2 mb-3 flex-none"
            startContent={<AiOutlineMessage size={24} />}
            onClick={() => {
              navigate('/?type=new');
              if (isSmallScreen && isFloatingNav) {
                setNavExpanded(false);
              }
            }}
          >
            Đoạn chat mới
          </Button>
          <p className="px-4 py-3 text-small text-default-400">Recent</p>
          <div className="p-1 flex flex-1 overflow-hidden">
            {conversations && (
              <ConversationList conversationList={conversations} selectedConversation={conversationId} />
            )}
          </div>
        </NavBar>
      </div>
    </div>
  );
}
