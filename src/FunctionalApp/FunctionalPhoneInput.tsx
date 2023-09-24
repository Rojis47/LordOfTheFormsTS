import React, {
  useRef,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";

export type PhoneInputState = [string, string, string, string];

function PhoneInput({
  phoneInputState,
  setPhoneInputState,
}: {
  phoneInputState: PhoneInputState;
  setPhoneInputState: Dispatch<SetStateAction<PhoneInputState>>;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const onChangeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const newValue = e.target.value.slice(0, lengths[index]);

      if (newValue.length === lengths[index] && refs.current[index + 1]) {
        refs.current[index + 1]?.focus();
      } else if (newValue.length === 0 && refs.current[index - 1]) {
        refs.current[index - 1]?.focus();
      }

      const newState = [...phoneInputState] as PhoneInputState;
      newState[index] = newValue;
      setPhoneInputState(newState);
    };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        {phoneInputState.map((value, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => (refs.current[index] = el)}
              type="number"
              id={`phone-input-${index + 1}`}
              value={value}
              onChange={onChangeHandler(index)}
              placeholder={index === 3 ? "5" : "55"}
            />
            {index < phoneInputState.length - 1 && "-"}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PhoneInput;
