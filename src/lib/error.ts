import { ResponseError } from "@/apiClient";

export const errorHandler = async (
  error: unknown,
  messageHandler: ((msg: string) => void) | undefined = undefined
) => {
  let message = "An unknown error occurred.";
  if (error instanceof ResponseError) {
    const res = await error.response.json();
    const maybeMessage: unknown = res.message;
    if (maybeMessage && typeof maybeMessage === "string") {
      message = maybeMessage;
    } else {
      message = error.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  if (messageHandler) {
    messageHandler(message);
  }
};
