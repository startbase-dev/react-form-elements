import React, { forwardRef } from 'react';
import Input, { type InputProps } from '../Input';
import s from './NumberInput.module.scss';
import { useFormContext } from 'react-hook-form';

interface NumberInputProps extends InputProps {
  name: string;
  value?: string | number;
  onChange: (event: {
    target: { name: string; value: string | number };
  }) => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ name, ...rest }, inputRef) => {
    const { watch, setValue } = useFormContext();
    const value = watch(name);

    const handleIncrease = () => {
      setValue(name, Number.parseInt(value) + 1);
    };

    const handleDecrease = () => {
      setValue(name, Number.parseInt(value) - 1);
    };

    return (
      <Input
        ref={inputRef}
        {...rest}
        type="number"
        inputMode="numeric"
        name={name}
        append={
          <div className={s.buttons}>
            <button type="button" className={s.button} onClick={handleIncrease}>
              <svg
                width={20}
                height={20}
                style={{ transform: 'rotate(180deg)' }}
              >
                <path
                  fill="currentColor"
                  d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163s-.436-1.17 0-1.615z"
                />
              </svg>
            </button>
            <button type="button" className={s.button} onClick={handleDecrease}>
              <svg width={20} height={20}>
                <path
                  fill="currentColor"
                  d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163s-.436-1.17 0-1.615z"
                />
              </svg>
            </button>
          </div>
        }
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;

export { type NumberInputProps };
