import ConversationDetail from '../components/ConversationDetail/ConversationDetail';
import ConversationNav from '../components/ConversationNav/ConversationNav';

export default function ConversationPage() {
  return (
    <div className="flex h-[calc(100dvh)] py-4 relative">
      <ConversationNav />
      <div className="flex-1 px-4">
        <ConversationDetail />
      </div>
    </div>
  );
}
