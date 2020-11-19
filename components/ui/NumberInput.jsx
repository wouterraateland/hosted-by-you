import * as _ from "utils";

import BaseInput from "./BaseInput";

export default function NumberInput({ onChange, decimals = 2, ...props }) {
  return (
    <BaseInput
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={(event) => {
        const value = _.stringToFixed(event.target.value, decimals);
        if (!isNaN(value)) {
          onChange({
            ...event,
            target: {
              ...event.target,
              value: value.replace(".", ","),
              validity: { valid: true },
            },
          });
        }
      }}
      {...props}
    />
  );
}
