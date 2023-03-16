import { getStartingChatLog } from "#/app/chat/lib/helpers/chat-helpers";
import { DEFAULT_CHAT_BOT } from "#/lib/constants/settings";
import { ChatContextProvider } from "#/lib/contexts/ChatContext";
import { fetchBot } from "#/lib/helpers/request-helpers/makeCmsRequest";
import { getMediaUrl } from "#/lib/helpers/url-helpers";
import { Bot } from "#/lib/types/cms";
import ChatLayout from "#/ui/layouts/ChatLayout/ChatLayout";
import LandingLayout from "#/ui/layouts/LandingLayout/LandingLayout";
import ChatInput from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatMessages from "#/ui/modules/Chat/ChatMessages/ChatMessages";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";

type BotPageProps = {
  params: {
    slug: keyof Bot;
  };
};

export default async function Page({ params }: BotPageProps) {
  const bot = await fetchBot(DEFAULT_CHAT_BOT);
  console.log("Default bot:", bot);

  const botAvatarUrl = !!bot?.avatar?.data
    ? getMediaUrl(bot.avatar.data.attributes.url)
    : undefined;
  const startingChatLog = bot ? getStartingChatLog(bot) : null;
  console.log("startingChatLog", startingChatLog);

  const sidebar = (
    <>
      {/* {areAssumptionsShown && <ChatAssumptions />} */}
      <ChatSuggestions className="mt-auto max-h-24 overflow-y-auto sm:max-h-fit" />
    </>
  );

  return (
    <LandingLayout data-theme="light">
      <ChatContextProvider startingChatLog={startingChatLog}>
        <ChatLayout sidebar={sidebar}>
          <ChatMessages botAvatarUrl={botAvatarUrl} className="h-full" />
          <ChatInput />
        </ChatLayout>
      </ChatContextProvider>
    </LandingLayout>
  );
}
