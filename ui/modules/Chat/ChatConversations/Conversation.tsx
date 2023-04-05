import { Conversation } from "#/app/chat/lib/types";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { useOutsideClick } from "#/lib/hooks/useOutsideClick";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import Loader from "#/ui/atoms/Loader/Loader";
import {
  ChatBubbleLeftIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { DragEvent, FC, KeyboardEvent, useEffect, useState } from "react";

interface Props {
  conversation: Conversation;
}

export const ConversationItem: FC<Props> = ({ conversation }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const ref = useOutsideClick<HTMLLIElement>(() => {
    setIsRenaming(false);
    setIsDeleting(false);
  });

  const {
    appState: { loading, selectedConversation },
    appActions: { selectConversation },
    dataActions: { updateConversation, deleteConversation },
  } = useConversationsContext();

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      !!selectedConversation && handleRename(selectedConversation);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, conversation: Conversation) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("conversation", JSON.stringify(conversation));
    }
  };

  const handleRename = (conversation: Conversation) => {
    updateConversation({ ...conversation, name: renameValue });
    setRenameValue("");
    setIsRenaming(false);
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  const itemStyles = clsx(
    "flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-blue-300/50 dark:hover:bg-slate-700/25",
    loading && "disabled:cursor-not-allowed",
  );

  const buttonStyles = "dark:text-blue-100 opacity-50 dark:hover:text-blue-200 hover:opacity-75";

  const inputStyles =
    "mr-12 pl-2 py-2 -ml-1 w-full flex-1 overflow-hidden overflow-ellipsis border-neutral-900 bg-black/25 text-left text-[12.5px] leading-3 outline-none focus:border-blue-300/50";

  return !selectedConversation ? (
    <li>Loading</li>
  ) : (
    <li className="relative flex items-center" ref={ref}>
      {isRenaming && selectedConversation.id === conversation.id ? (
        <div
          className={clsx(
            itemStyles,
            selectedConversation.id === conversation.id &&
              "bg-blue-300/50 py-1 dark:bg-blue-700/25",
          )}
        >
          <ChatBubbleLeftIcon width={18} height={18} />
          <input
            className={inputStyles}
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleEnterDown}
            autoFocus
          />
        </div>
      ) : (
        <button
          className={clsx(
            itemStyles,
            selectedConversation.id === conversation.id && "bg-blue-300/50 dark:bg-blue-700/25",
          )}
          onClick={() => selectConversation(conversation)}
          disabled={loading}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, conversation)}
        >
          <ChatBubbleLeftIcon width={18} height={18} />
          <div
            className={`relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] leading-3 ${
              selectedConversation.id === conversation.id ? "pr-12" : "pr-1"
            }`}
          >
            {conversation.name}
          </div>
        </button>
      )}

      {(isDeleting || isRenaming) && selectedConversation.id === conversation.id && (
        <div className="visible absolute right-1 z-10 flex">
          <BaseButton
            flavor="icon"
            icon={<CheckIcon />}
            className={"text-green-400 hover:text-green-500"}
            onClick={(e) => {
              e.stopPropagation();
              if (isDeleting) {
                deleteConversation(conversation);
              } else if (isRenaming) {
                handleRename(conversation);
              }
              setIsDeleting(false);
              setIsRenaming(false);
            }}
          />
          <BaseButton
            flavor="icon"
            icon={<XMarkIcon />}
            className={"text-red-300 hover:text-red-500"}
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleting(false);
              setIsRenaming(false);
            }}
          />
        </div>
      )}

      {selectedConversation.id === conversation.id && !isDeleting && !isRenaming && (
        <div className="visible absolute right-1 z-10 flex">
          <BaseButton
            flavor="icon"
            className={buttonStyles}
            icon={<PencilIcon />}
            onClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
              setRenameValue(selectedConversation.name);
            }}
          />
          <BaseButton
            flavor="icon"
            icon={<TrashIcon />}
            className={buttonStyles}
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleting(true);
            }}
          />
        </div>
      )}
    </li>
  );
};

export default ConversationItem;