import React, { forwardRef, useMemo } from 'react';
import cx from 'clsx';
import { CheckIcon } from '../Icon';
import s from './Radio.module.css';

interface RadioProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label?: string | React.ReactNode;
  checked?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  error?: boolean | string | { message: string };
  [rest: string]: any;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      name,
      onChange,
      value,
      label = null,
      checked = false,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      disabled = false,
      error = null,
      ...rest
    },
    inputRef
  ) => {
    const errorMessage = useMemo(() => {
      if (error && typeof error === 'string') {
        return error;
      } else if (error && typeof error === 'object' && error.message) {
        return error.message;
      }
      return null;
    }, [error]);

    return (
      <label htmlFor={`radio_${name}_${value}`} className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          <input
            ref={inputRef}
            className={s.input}
            name={name}
            type="radio"
            checked={checked}
            value={value}
            onChange={onChange}
            id={`radio_${name}_${value}`}
            disabled={disabled}
            {...rest}
          />
          <span
            className={cx(s.box, {
              [s.boxDisabled]: disabled,
              [s.inputError]: typeof error === 'boolean' && error,
              [s.noLabel]: !label,
              ...(inputClassName ? { [inputClassName]: true } : {}),
            })}
          >
            <CheckIcon className={s.icon} />
          </span>
          <div
            className={cx(s.label, {
              ...(labelClassName ? { [labelClassName]: true } : {}),
            })}
          >
            {label}
          </div>
        </div>
        {errorMessage && (
          <div
            className={cx(s.errorLabel, {
              ...(errorClassName ? { [errorClassName]: true } : {}),
            })}
          >
            {errorMessage}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
