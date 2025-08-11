import { useCallback } from "react";

export function useComposedRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return useCallback(
    (node: T) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref != null) {
          
          ref.current = node;
        }
      }
    },
    [refs]
  );
}
