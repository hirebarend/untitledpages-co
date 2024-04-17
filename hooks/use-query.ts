import { useEffect, useState } from "react";

export function useFetch<T>(params: { fn: (obj: any) => Promise<T | null> }) {
  const [result, setResult] = useState(null as { data: T | null } | null);
  const [isLoading, setIsLoading] = useState(false);

  return {
    execute: (obj: any) => {
      setIsLoading(true);

      params.fn(obj).then((obj: T | null) => {
        setResult({
          data: obj,
        });
        setIsLoading(false);
      });
    },
    isLoading,
    result,
  };
}
