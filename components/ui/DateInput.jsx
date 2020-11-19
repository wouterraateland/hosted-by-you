import "./DateInput.scss";

import cx from "classnames";
import { format } from "date-fns";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import useTranslation from "hooks/useTranslation";

import { DayPicker } from "react-day-picker";
import BaseInput from "./BaseInput";
import FlyOut from "./FlyOut";

const DateInput = forwardRef(
  ({ className, placeholder, value, onChange, autoFocus, ...props }, ref) => {
    const [isOpen, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const { locale } = useTranslation();

    useEffect(() => {
      if (autoFocus) {
        buttonRef.current.focus();
        setOpen(true);
      }
    }, [autoFocus]);

    return (
      <>
        <button
          ref={(node) => {
            if (ref) {
              ref.current = node;
            }
            buttonRef.current = node;
          }}
          className={cx("input text-left cursor-pointer", className)}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              setOpen(false);
            }
          }}
          {...props}
        >
          {value ? (
            <p>{format(new Date(value), "PPP", { locale })}</p>
          ) : (
            <p className="text-caption">{placeholder}</p>
          )}
        </button>
        <FlyOut
          originRef={buttonRef}
          className="px-4 py-2"
          persistOnClick
          isOpen={isOpen}
          onClick={() => buttonRef.current.focus()}
          onClose={() => setOpen(false)}
        >
          <DayPicker
            selected={value ? new Date(value) : null}
            onDayClick={(value) => {
              onChange(format(value, "yyyy-MM-dd"));
              setOpen(false);
            }}
            locale={locale}
          />
        </FlyOut>
      </>
    );
  }
);

export default forwardRef((props, ref) => (
  <BaseInput ref={ref} component={DateInput} {...props} />
));
