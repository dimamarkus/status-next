"use client";
import { filterConversationsData } from "#/app/chat/lib/helpers/chat-helpers";
import { ConversationsDataState } from "#/app/chat/lib/reducer";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import { SidebarButton } from "#/ui/atoms/buttons/SidebarButton/SidebarButton";
import Clear from "#/ui/modules/Chat/ChatConversations/Clear";
import { Conversations } from "#/ui/modules/Chat/ChatConversations/Conversations";
import Import from "#/ui/modules/Chat/ChatConversations/Import";
import {
  ArrowDownTrayIcon,
  EyeSlashIcon,
  FolderPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Search } from "./Search";
import Folders from "#/ui/modules/Chat/ChatConversations/Folders";

export const ChatConversations = () => {
  const {
    appActions: { selectConversation },
    dataState: { folders, rootConversations },
    dataActions: {
      resetFolders,
      exportConversations,
      addConversation,
      addFolder,
      setConversations,
    },
  } = useConversationsContext();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ConversationsDataState>({
    folders,
    rootConversations,
  });

  const handleAddConversation = () => {
    setSearchTerm("");
    addConversation();
  };

  const handleImportConversations = (data: ConversationsDataState) => {
    const rootConversation = data.rootConversations[data.rootConversations.length - 1];
    const nestedConversation = data.folders[0]?.conversations[0];
    setConversations(data);
    selectConversation(rootConversation || nestedConversation);
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredData = filterConversationsData({ folders, rootConversations }, searchTerm);
      setFilteredData(filteredData);
    } else {
      setFilteredData({ folders, rootConversations });
    }
  }, [searchTerm, folders, rootConversations]);

  const hasConversations = rootConversations.length > 1 || folders.length > 0;

  return (
    <>
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
      {hasConversations && <Search searchTerm={searchTerm} onSearch={setSearchTerm} />}

      {folders.length > 0 && (
        <div className="flex border-b border-neutral-500/20">
          <Folders searchTerm={searchTerm} folders={folders} />
        </div>
      )}

      {rootConversations.length > 0 && (
        <Conversations conversations={filteredData.rootConversations} />
      )}
      {!rootConversations.length && !folders.length && (
        <div className="mt-8 select-none text-center opacity-50">
          <EyeSlashIcon className="mx-auto mb-3" width={18} height={18} />
          <span className="text-[12.5px] leading-3">No conversations.</span>
        </div>
      )}

      <footer className="mt-auto flex flex-col items-center space-y-1 border-t border-neutral-500/20 text-sm">
        {(rootConversations.length || folders.length) > 0 ? <Clear onClear={resetFolders} /> : null}
        <Import onImport={handleImportConversations} />
        <SidebarButton
          text="Export conversations"
          icon={<ArrowDownTrayIcon width={18} height={18} />}
          onClick={exportConversations}
        />
      </footer>
    </>
  );
};

export default ChatConversations;
