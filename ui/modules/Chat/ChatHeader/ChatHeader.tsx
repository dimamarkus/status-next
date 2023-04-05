"use client";

import { DEFAULT_CONVERSATION_NAME } from "#/app/chat/lib/constants";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC } from "react";

export const ChatHeader: FC = () => {
  const { settings } = useSettingsContext();
  const { isFullScreen, toggleFullScreen, sidebarIsVisible, toggleSidebar } = useLayoutContext();
  const {
    appState: { selectedConversation },
    dataActions: { resetConversation, addConversation },
  } = useConversationsContext();

  const handleResetConversation = () => {
    if (confirm("Are you sure you want to clear all messages?")) {
      selectedConversation && resetConversation(selectedConversation);
    }
  };

  const rootStyles =
    "flex justify-center border border-b-neutral-300 bg-slate-100 py-1 text-sm text-neutral-500 dark:border-none dark:bg-[#444654] dark:text-neutral-200 z-[1]";

  const sidebarToggleStyles = clsx(
    settings.sidebarRight
      ? "border-r-2 border-l-0 ml-auto mr-2"
      : "border-l-2 border-r-0 ml-2 mr-auto",
    "rounded-none border-t-0 border-b-0 border-neutral-400 text-neutral-400 py-0 my-auto hover:bg-transparent",
  );

  const fullScreenButton = (
    <BaseButton
      className={settings.sidebarRight ? "mr-auto" : "ml-auto"}
      flavor="icon"
      icon={!isFullScreen ? <ArrowsPointingOutIcon /> : <ArrowsPointingInIcon />}
      onClick={() => toggleFullScreen()}
      theme="secondary"
      title={(!isFullScreen ? "Enter" : "Exit") + " Full-screen"}
    />
  );

  const sidebarTogglebutton = (
    <BaseButton
      className={sidebarToggleStyles}
      flavor="hollow"
      icon={
        (settings.sidebarRight && !sidebarIsVisible) ||
        (!settings.sidebarRight && sidebarIsVisible) ? (
          <ArrowLeftIcon />
        ) : (
          <ArrowRightIcon />
        )
      }
      onClick={toggleSidebar}
      theme="secondary"
    />
  );

  return (
    <header className={rootStyles}>
      {settings.sidebarRight ? fullScreenButton : sidebarTogglebutton}
      <BaseButton
        flavor="icon"
        icon={<TrashIcon />}
        onClick={handleResetConversation}
        theme="secondary"
        title="Clear all messages"
      />
      <div className="flex max-w-[240px] items-center overflow-hidden text-ellipsis whitespace-nowrap">
        {selectedConversation ? selectedConversation.name : DEFAULT_CONVERSATION_NAME}
      </div>
      <BaseButton
        flavor="icon"
        icon={<PlusIcon />}
        onClick={addConversation}
        theme="secondary"
        title="Start new conversation"
      />
      {settings.sidebarRight ? sidebarTogglebutton : fullScreenButton}
    </header>
  );
};

export default ChatHeader;
