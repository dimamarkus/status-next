import { redirect } from "next/navigation";
import { DEFAULT_CHAT_BOT } from "#/lib/constants/settings";

export default function Page() {
  redirect("/playground/" + DEFAULT_CHAT_BOT);
}