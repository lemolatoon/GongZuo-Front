import { ResponseError } from "@/apiClient";

export const errorHandler = (
  error: unknown,
  messageHandler: ((msg: string) => void) | undefined = undefined
) => {
  let message = "An unknown error occurred.";
  if (error instanceof ResponseError) {
    message = error.message;
  } else if (error instanceof ResponseError) {
    message = error.message;
  }

  if (messageHandler) {
    messageHandler(message);
  }
};
