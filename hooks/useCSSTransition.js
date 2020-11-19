import { useLayoutEffect, useRef } from "react";

export default function useCSSTransition(flag, { ref, timeout, appear }) {
  const innerRef = useRef(null);
  const stateRef = useRef(appear ? "appear" : "enter");

  const actualRef = ref || innerRef;

  useLayoutEffect(() => {
    if (actualRef.current) {
      actualRef.current.style.transitionDuration = `${timeout}ms`;
      let t1 = null;
      let t2 = null;
      if (flag) {
        if (stateRef.current.startsWith("enter")) {
          if (!actualRef.current.className.includes("enter")) {
            actualRef.current.classList.add("enter-done");
          }
        } else {
          stateRef.current = "enter";
          actualRef.current.classList.remove(
            "exit",
            "exit-active",
            "exit-done"
          );
          actualRef.current.classList.add("enter");
          t1 = setTimeout(() => {
            if (actualRef.current) {
              actualRef.current.classList.remove("enter");
              actualRef.current.classList.add("enter-active");
              t2 = setTimeout(() => {
                if (actualRef.current) {
                  actualRef.current.classList.remove("enter-active");
                  actualRef.current.classList.add("enter-done");
                }
              }, timeout);
            }
          }, 10);
        }
      } else {
        if (stateRef.current.startsWith("exit")) {
          if (!actualRef.current.className.includes("exit")) {
            actualRef.current.classList.add("exit-done");
          }
        } else {
          stateRef.current = "exit";
          actualRef.current.classList.remove(
            "enter",
            "enter-active",
            "enter-done"
          );
          actualRef.current.classList.add("exit");
          t1 = setTimeout(() => {
            if (actualRef.current) {
              actualRef.current.classList.remove("exit");
              actualRef.current.classList.add("exit-active");
              t2 = setTimeout(() => {
                if (actualRef.current) {
                  actualRef.current.classList.remove("exit-active");
                  actualRef.current.classList.add("exit-done");
                }
              }, timeout);
            }
          }, 10);
        }
      }
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [flag, actualRef, timeout]);

  return actualRef;
}
