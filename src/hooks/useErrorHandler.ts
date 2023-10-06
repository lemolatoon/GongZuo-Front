import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export const useErrorMessageHandler = (title?: string) => {
  const { toast } = useToast();
  const handleErrorMessage = useCallback(
    (errorMessage: string) => {
      console.error(errorMessage);
      toast({
        variant: "destructive",
        title: "Error occured on the server :(",
        description: title ?? errorMessage,
      });
    },
    [toast, title]
  );

  return {
    handleErrorMessage,
  };
};
