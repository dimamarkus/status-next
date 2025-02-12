import { inProdEnv } from "#/lib/helpers/env-helpers";
import { getBotAvatar } from "#/lib/helpers/url-helpers";
import { Bot } from "#/lib/types/cms";
import Spinner from "#/ui/atoms/svgs/Spinner";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import clsx from "clsx";
import Link from "next/link";

export type ChatBots = {
  bots: Bot[];
  className?: string;
};

export const ChatBots = ({ bots, className }: ChatBots) => {
  if (!bots) {
    return <Spinner />;
  }

  const botOptions = bots.filter((bot) => (inProdEnv ? bot.is_featured : true));

  return (
    <nav className={clsx("flex flex-col", className)}>
      {botOptions.map((botOption) => (
        <Link
          key={botOption.slug}
          href={`/chat/${botOption.slug}`}
          title={botOption.name}
          className={clsx(
            "flex cursor-pointer items-center p-2 hover:bg-slate-200 dark:hover:bg-slate-800",
          )}
        >
          <ChatMessageAvatar avatarUrl={getBotAvatar(botOption, true)} />
          <div className="ml-2 flex flex-col">
            <span className="font-medium">{botOption.name}</span>
            <span className="text-xs text-slate-500">{botOption.description}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default ChatBots;
