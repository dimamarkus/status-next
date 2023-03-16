"use client";
import cn from "classnames";
import React from "react";
import styles from "./ChatLayout.module.scss";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import FullScreenToggleButton from "#/ui/molecules/actionButtons/FullScreenToggleButton/FullScreenToggleButton";

type ChatLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

const ChatLayout = ({ children, sidebar }: ChatLayoutProps) => {
  const { isFullScreen } = useFullScreenContext();
  return (
    <section className={cn(styles.ChatLayout, isFullScreen && styles.fullScreen)}>
      <div>
        <FullScreenToggleButton />
        {children}
      </div>
      <aside>{sidebar}</aside>
    </section>
  );
};

export default ChatLayout;
