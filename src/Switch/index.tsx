import React, { forwardRef, useMemo } from 'react';
import cx from 'clsx';
import s from './Switch.module.scss';

interface SwitchProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | React.ReactNode;
  checked?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  error?: boolean | string | { message: string };
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
      } else if (error && typeof error === 'object' && error.message) {
        return error.message;
      }
      return null;
    }, [error]);

    return (
      <label htmlFor={`switch_${name}`} className={s.switch}>
        <div className={s.inputRoot}>
          <input
            ref={inputRef}
            className={s.switchCheckbox}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id={`switch_${name}`}
            disabled={disabled}
          />
          <div
            className={cx(s.switchLabel, {
              [s.disabled]: disabled,
              [s.inputError]: typeof error === 'boolean' && error,
              ...(inputClassName ? { [inputClassName]: true } : {}),
              [s.switchInnerChecked]: checked,
              [s.noLabel]: !label,
            })}
          >
            <span
              className={cx(s.switchSwitch, {
                [s.switchSwitchChecked]: checked,
              })}
            />
          </div>
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

Switch.displayName = 'Switch';

export default Switch;

export { type SwitchProps };
