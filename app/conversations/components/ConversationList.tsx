'use client';
import useConversation from '@/app/hooks/useConversation';
import { FullConversationType } from '@/app/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        'overflow-y-auto border-r border-gray-200 lg:left-20 lg:block fixed inset-y-0 pb-20 lg:w-80 lg:pb-0 ',
        isOpen ? 'hidden' : 'left-0 block w-full'
      )}
    >
      <div className="px-5">
        <div className="mb-4 flex justify-between pt-4">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <div>
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ConversationList;
