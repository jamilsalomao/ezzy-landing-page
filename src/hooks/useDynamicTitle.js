import { useEffect } from "react";

export function useDynamicTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
