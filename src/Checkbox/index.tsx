import React, { forwardRef, useMemo, ChangeEvent, ReactNode } from 'react';
import cx from 'clsx';
import { CheckIcon } from '../Icon';
import s from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  checked?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  error?: string | boolean | { message?: string };
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      onChange,
      label = null,
      checked = false,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      disabled = false,
      error = null,
    },
    inputRef
  ) => {
    const errorMessage = useMemo(() => {
      if (error && typeof error === 'string') {
        return error;
      } else if (error && typeof error === 'object' && error?.message) {
        return error.message;
      }
      return null;
    }, [error]);

    return (
      <label htmlFor={`checkbox_${name}`} className={s.root}>
        <div className={cx(s.inputRoot)}>
          <input
            ref={inputRef}
            className={s.input}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id={`checkbox_${name}`}
            disabled={disabled}
          />
          <span
            className={cx(s.box, {
              [s.boxDisabled]: disabled,
              [s.noLabel]: !label,
              [s.inputError]: typeof error === 'boolean' && error,
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
        {errorMessage ? (
          <div
            className={cx(s.errorLabel, {
              ...(errorClassName ? { [errorClassName]: true } : {}),
            })}
          >
            {errorMessage}
          </div>
        ) : null}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

export { type CheckboxProps };
