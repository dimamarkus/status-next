import { GPT_CHAT_URL, GPT_COMPLETIONS_URL } from "#/app/chat/lib/constants";
import { isChatModel } from "#/app/chat/lib/helpers/chat-helpers";
import {
  OpenAiChatRequest,
  OpenAiChatResponse,
  OpenAiCompletionRequest,
  OpenAiCompletionResponse,
  OpenAiRequest,
  OpenAiResponse,
} from "#/app/chat/lib/types";
import { makePostRequest } from "#/lib/helpers/requests/makeRequest";
import { NextApiResponse } from "next";

export const GENERATE_CHAT_ENDPOINT = "/chat/generate";

// The most basic way to use the OpenAI API is to send a POST request to the /v1/engines/:engine/completions endpoint.
// Used for suggestions, submissions and other auxillary requests
export default async function handler({ body }: Request, res: NextApiResponse) {
  const payload = { ...body } as OpenAiRequest;
  const useChatApi = isChatModel(payload.model);

  if (useChatApi && !(payload as OpenAiChatRequest).messages) {
    return new Response("No 'messages' in the request", { status: 400 });
  } else if (!useChatApi && !(payload as OpenAiCompletionRequest).prompt) {
    return new Response("No 'prompt' in the request", { status: 400 });
  }

  const endpointUrl = useChatApi ? GPT_CHAT_URL : GPT_COMPLETIONS_URL;
  const authHeaders = { Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}` };

  const response = await makePostRequest<OpenAiResponse, OpenAiRequest>(
    endpointUrl,
    payload,
    authHeaders,
  );

  if (!response?.choices || response.choices.length === 0) {
    res.status(500).json({ error: "No result from OpenAI" });
    return;
  }

  const resultContent = useChatApi
    ? (response as OpenAiChatResponse).choices[0].message?.content
    : (response as OpenAiCompletionResponse).choices[0].text;

  res.status(200).json(resultContent);
}
