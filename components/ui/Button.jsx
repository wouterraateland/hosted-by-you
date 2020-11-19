import { forwardRef } from "react";
import useAsyncCallback from "hooks/useAsyncCallback";

export default forwardRef(function Button(
  { children, onClick, disabled, ...props },
  ref
) {
  const [{ isPending, showPending }, asyncOnClick] = useAsyncCallback(onClick, [
    onClick,
  ]);

  return (
    <button
      ref={ref}
      onClick={asyncOnClick}
      disabled={isPending || disabled}
      {...props}
    >
      {showPending ? <div className="loader loader--sm" /> : children}
    </button>
  );
});
