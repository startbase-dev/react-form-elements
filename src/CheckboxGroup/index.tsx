import React, { forwardRef, useCallback, useMemo } from 'react';
import cx from 'clsx';
import Checkbox from '../Checkbox';
import s from './CheckboxGroup.module.scss';

interface Option {
  value: string | number;
  label: string | React.ReactNode;
}

interface CheckboxGroupProps {
  name: string;
  onChange: (event: {
    target: { name: string; value: (string | number)[] };
  }) => void;
  value?: (string | number)[];
  options: Option[];
  label?: string | React.ReactNode | null;
  inputClassName?: string | null;
  labelClassName?: string | null;
  optionLabelClassName?: string | null;
  errorClassName?: string | null;
  disabled?: boolean;
  error?: boolean | string | { message?: string } | null;
}

const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  (
    {
      name,
      onChange,
      value = [],
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
    const handleChange = useCallback(
      (checked: boolean, optionValue: string | number) => {
        let newValue: (string | number)[];
        if (checked) {
          newValue = [...value, optionValue];
        } else {
          newValue = value.filter((val) => val !== optionValue);
        }

        onChange({
          target: {
            name,
            value: newValue,
          },
        });
      },
      [onChange, value, name]
    );

    const errorMessage = useMemo(() => {
      if (typeof error === 'string') {
        return error;
      } else if (error && typeof error === 'object' && error.message) {
        return error.message;
      }
      return null;
    }, [error]);

    return (
      <label className={s.root}>
        {label && (
          <span
            className={cx(s.label, {
              [labelClassName as string]: labelClassName,
            })}
          >
            {label}
          </span>
        )}
        {options.map((option, index) => {
          return (
            <Checkbox
              ref={inputRef}
              key={index}
              inputClassName={inputClassName ?? ''}
              labelClassName={optionLabelClassName ?? ''}
              checked={value ? value.includes(option.value) : false}
              label={option.label}
              value={option.value}
              error={typeof error === 'boolean' && error}
              disabled={disabled}
              name={`${name}_${index}`}
              onChange={(e) => handleChange(e.target.checked, option.value)}
            />
          );
        })}
        {errorMessage && (
          <div
            className={cx(s.errorLabel, {
              [errorClassName as string]: errorClassName,
            })}
          >
            {errorMessage}
          </div>
        )}
      </label>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;

export { type CheckboxGroupProps };
