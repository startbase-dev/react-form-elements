import React, { forwardRef, useMemo } from 'react';
import cx from 'clsx';
import Radio from '../Radio';
import s from './RadioGroup.module.scss';
import { FieldError } from 'react-hook-form';

interface Option {
  value: string;
  label: string | React.ReactNode;
}

interface RadioGroupProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | null;
  options: Option[];
  label?: string | React.ReactNode;
  inputClassName?: string;
  labelClassName?: string;
  optionLabelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  error?:
    | boolean
    | string
    | { message?: string }
    | null
    | undefined
    | FieldError;
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      name,
      onChange,
      value = null,
      options = [],
      label = null,
      inputClassName = null,
      labelClassName = null,
      optionLabelClassName = null,
      errorClassName = null,
      disabled = false,
      error = null,
    },
    inputRef
  ) => {
    const errorMessage = useMemo(() => {
      if (error && typeof error === 'string') return error;
      if (error && typeof error === 'object' && error.message)
        return error.message;
      return null;
    }, [error]);

    return (
      <label className={s.root}>
        <span
          className={cx(s.label, {
            ...(labelClassName ? { [labelClassName]: true } : {}),
          })}
        >
          {label}
        </span>
        {options.map((option, index) => (
          <Radio
            ref={inputRef}
            key={index}
            inputClassName={inputClassName}
            labelClassName={optionLabelClassName}
            checked={option.value === value}
            label={option.label}
            value={option.value}
            error={error && typeof error === 'boolean'}
            disabled={disabled}
            name={name}
            onChange={onChange}
          />
        ))}
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

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;

export { type RadioGroupProps };
