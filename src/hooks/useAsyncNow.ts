import { useCallback, useState } from "react";

export const useAsyncNow = () => {
  const [now, setNow] = useState(new Date());

  const invalidate = useCallback(() => {
    setNow(new Date());
  }, [setNow]);

  return {
    now,
    invalidate,
  };
};
