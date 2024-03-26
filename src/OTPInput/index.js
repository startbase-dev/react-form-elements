import { OTPInput } from 'input-otp';

import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';

import s from './OTPInput.module.css';
import PropTypes from 'prop-types';
import Slot from './Slot';

import cx from 'classnames';
import { useCountDown } from '../utils/useCountDown';
import { remove, set } from '../utils/localStorage';
import { formatSeconds } from '../utils/date';

const Index = forwardRef(
  (
    {
      name,
      length,
      onChange,
      format = null,
      separator = '-',
      timer = null,
      onComplete = () => {},
      onResend = () => {},
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
      let message;
      if (error && typeof error === 'string') {
        message = error;
      } else if (error && typeof error === 'object' && error?.message) {
        message = error?.message;
      } else {
        message = null;
      }

      return message;
    }, [error]);

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [labelClassName]: labelClassName,
          })}
          onClick={() => {
            try {
              const inputs = document.querySelectorAll(`[name="${name}"]`);

              if (!inputs.length) {
                return;
              }

              let input = inputs?.[0];

              if (input?.type === 'hidden') {
                input = input?.parentNode?.querySelector('input');
              }

              input?.focus();
            } catch (error) {
              throw error;
            }
          }}
        >
          {label}
        </label>
      ),
      [name, label, labelClassName]
    );

    const handleChange = useCallback(
      (e) => {
        onChange({
          target: {
            name: name,
            value: e,
          },
        });
      },
      [onChange, name]
    );

    const createSlot = (slot) => (
      <Slot
        hasFakeCaret={slot.hasFakeCaret}
        isActive={slot.isActive}
        char={slot.char}
        inputClassName={inputClassName}
        disabled={disabled}
        error={typeof error === 'boolean' && error}
      />
    );

    const generateSlots = (format, slots) => {
      const allSlots = [];

      const cumulativeSums = format.reduce((acc, curr, index) => {
        const sum = index === 0 ? curr : acc[index - 1] + curr;
        acc.push(sum);
        return acc;
      }, []);

      format.forEach((_, index) => {
        const start = index === 0 ? 0 : cumulativeSums[index - 1];
        const end = cumulativeSums[index];

        const slotComponents = slots.slice(start, end).map(createSlot);

        allSlots.push(...slotComponents);
        if (separator && end !== slots.length) allSlots.push(separator);
      });

      return allSlots;
    };

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {label ? labelEl : null}

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
              {errorMessage ? (
                <span
                  className={cx(s.errorLabel, {
                    [errorClassName]: errorClassName,
                  })}
                >
                  {errorMessage}
                </span>
              ) : null}
            </div>

            {timer && (
              <>
                {seconds === 0 ? (
                  <button
                    type="button"
                    className={cx(s.resend, {
                      [s.resendActive]: !seconds,
                    })}
                    disabled={seconds}
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

Index.displayName = 'OTPInput';

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  timer: PropTypes.number,
  onComplete: PropTypes.func,
  onResend: PropTypes.func,
  value: PropTypes.string,
  format: PropTypes.arrayOf(PropTypes.number),
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  resendLabel: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Index;
