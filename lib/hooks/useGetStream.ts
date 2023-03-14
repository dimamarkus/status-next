import { useState } from "react";
import { makeRequest, post } from "#/lib/helpers/request-helpers/makeRequest";
import { makeStreamRequest } from "#/lib/helpers/request-helpers/makeStreamRequest";

export const useGetStream = <TRequestType>(endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [stream, setStream] = useState<string | undefined>(undefined);

  const getStream = async (requestBody: TRequestType) => {
    setLoading(true);
    try {
      const response = await makeStreamRequest(endpoint, "POST", requestBody);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const stream = response.body;
      if (!stream) {
        return;
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullValue = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        fullValue += chunkValue;
        !!setStream && setStream(fullValue);
      }
      if (done) {
        setLoading(false);
        setStream(undefined);
        return fullValue;
      }
    } catch (err: any) {
      setError(err);
    }
  };

  return { loading, stream, error, getStream };
};