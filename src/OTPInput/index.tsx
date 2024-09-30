import { OTPInput } from 'input-otp';
import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';
import s from './OTPInput.module.scss';
import Slot from './Slot';
import cx from 'clsx';
import { useCountDown } from '../utils/useCountDown';
import { remove, set } from '../utils/localStorage';
import formatSeconds from '../utils/date';

interface OTPInputProps {
  name: string;
  length: number;
  onChange: (event: { target: { name: string; value: string } }) => void;
  format?: number[] | null;
  separator?: string | React.ReactElement | null;
  timer?: number | null;
  onComplete?: () => void;
  onResend?: () => void;
  value?: string;
  error?: boolean | string | { message: string };
  label?: string | null;
  resendLabel?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
}

const OTPInputComponent = forwardRef<HTMLInputElement, OTPInputProps>(
  (
    {
      name,
      length,
      onChange,
      format = null,
      separator = '-',
      timer = null,
      onComplete = () => ({}),
      onResend = () => ({}),
      value = '',
      error = null,
      label = null,
      resendLabel = 'Resend',
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      disabled = false,
    },
    inputRef
  ) => {
    const [seconds, resetSeconds] = useCountDown(name);

    const handleResend = useCallback(() => {
      remove(name);
      remove(`${name}_TIMER`);
      resetSeconds();

      onChange({
        target: {
          name: name,
          value: '',
        },
      });
      onResend();
    }, [onResend, resetSeconds, name, onChange]);

    useEffect(() => {
      if (!timer) return;

      set(name, seconds);
      set(`${name}_TIMER`, +new Date());
    }, [name, seconds, timer]);

    const errorMessage = useMemo(() => {
      if (typeof error === 'string') {
        return error;
      } else if (typeof error === 'object' && error?.message) {
        return error.message;
      }
      return null;
    }, [error]);

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [labelClassName || '']: labelClassName,
          })}
        >
          {label}
        </label>
      ),
      [name, label, labelClassName]
    );

    const handleChange = useCallback(
      (e: string) => {
        onChange({
          target: {
            name: name,
            value: e,
          },
        });
      },
      [onChange, name]
    );

    const createSlot = (slot: any, idx: string | number) => (
      <Slot
        key={idx}
        hasFakeCaret={slot.hasFakeCaret}
        isActive={slot.isActive}
        char={slot.char}
        inputClassName={inputClassName ?? ''}
        disabled={disabled}
        error={typeof error === 'boolean' && error}
      />
    );

    const generateSlots = (format: number[], slots: any[]) => {
      const allSlots: React.ReactNode[] = [];
      const cumulativeSums = format.reduce((acc, curr, index) => {
        const sum = index === 0 ? curr : acc[index - 1]! + curr;
        acc.push(sum);
        return acc;
      }, [] as number[]);

      format.forEach((_, index) => {
        const start = index === 0 ? 0 : cumulativeSums[index - 1];
        const end = cumulativeSums[index];

        const slotComponents = slots
          .slice(start, end)
          .map((slot, idx) => createSlot(slot, `${idx}_${index}`));

        allSlots.push(...slotComponents);
        if (separator && end !== slots.length) allSlots.push(separator);
      });

      return allSlots;
    };

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {label && labelEl}
          <OTPInput
            maxLength={length}
            value={value}
            ref={inputRef}
            onChange={handleChange}
            onComplete={onComplete}
            disabled={disabled}
            render={({ slots }) => (
              <div className={s.inputs}>
                {format ? generateSlots(format, slots) : slots.map(createSlot)}
              </div>
            )}
          />
          <div className={s.resendContainer}>
            <div>
              {errorMessage && (
                <span
                  className={cx(s.errorLabel, {
                    [errorClassName || '']: errorClassName,
                  })}
                >
                  {errorMessage}
                </span>
              )}
            </div>
            {timer && (
              <>
                {seconds === 0 ? (
                  <button
                    type="button"
                    className={cx(s.resend, {
                      [s.resendActive]: !seconds,
                    })}
                    disabled={seconds !== 0}
                    onClick={handleResend}
                  >
                    {resendLabel}
                  </button>
                ) : (
                  <div className={s.time}>{formatSeconds(seconds)}</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

OTPInputComponent.displayName = 'OTPInput';

export default OTPInputComponent;

export { type OTPInputProps };
