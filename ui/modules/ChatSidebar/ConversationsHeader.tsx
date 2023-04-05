import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import { FolderPlusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

export const ConversationsHeader: FC<{ onAddConversation: () => void }> = (props) => {
  const { onAddConversation } = props;
  const {
    dataActions: { addFolder, addConversation },
  } = useConversationsContext();

  const handleAddConversation = () => {
    onAddConversation();
    addConversation();
  };

  return (
    <header className="mb-2 flex items-center">
      <BaseButton
        flavor="hollow"
        className="flex flex-grow cursor-pointer select-none items-center gap-3 rounded-md border border-neutral-500/20 p-3 text-[12.5px] leading-3 transition-colors duration-200 hover:bg-gray-500/10"
        size="sm"
        onClick={handleAddConversation}
      >
        <PlusIcon width={18} height={18} />
        New Conversation
      </BaseButton>

      <BaseButton
        size="sm"
        flavor="hollow"
        icon={<FolderPlusIcon />}
        className="ml-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-neutral-500/20 p-3 text-[12.5px] leading-3 transition-colors duration-200 hover:bg-gray-500/10"
        onClick={() => addFolder("New folder")}
      />
    </header>
  );
};
