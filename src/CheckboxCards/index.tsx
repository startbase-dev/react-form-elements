import React, { forwardRef, useCallback, useMemo } from 'react';
import cx from 'clsx';
import Checkbox from '../Checkbox';
import s from './CheckboxCards.module.scss';

interface Option {
  value: string | number;
  label: string | React.ReactNode;
}

interface CheckboxCardsProps {
  name: string;
  onChange: (event: {
    target: { name: string; value: (string | number)[] };
  }) => void;
  value?: (string | number)[];
  options: Option[];
  label?: string | React.ReactNode | null;
  inputClassName?: string | null;
  cardClassName?: string | null;
  labelClassName?: string | null;
  optionLabelClassName?: string | null;
  errorClassName?: string | null;
  direction?: 'row' | 'column';
  hideInput?: boolean;
  disabled?: boolean;
  error?: boolean | string | { message?: string } | null;
}

const CheckboxCards = forwardRef<HTMLInputElement, CheckboxCardsProps>(
  (
    {
      name,
      onChange,
      value = [],
      options = [],
      label = null,
      inputClassName = null,
      cardClassName = null,
      labelClassName = null,
      optionLabelClassName = null,
      direction = 'column',
      hideInput = true,
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
          newValue = value?.filter((val) => val !== optionValue);
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
        <div
          className={cx(s.container, {
            [s.row]: direction === 'row',
            [s.column]: direction === 'column',
          })}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={cx(cardClassName, s.card, {
                [s.selected]: value ? value.includes(option.value) : false,
                [s.disabled]: disabled,
                [s.inputError]: typeof error === 'boolean' && error,
              })}
              onClick={() =>
                handleChange(
                  value ? value.includes(option.value) : false,
                  option.value
                )
              }
            >
              <Checkbox
                ref={inputRef}
                inputClassName={cx({
                  [s.hide]: hideInput,
                  ...(inputClassName ? { [inputClassName]: true } : {}),
                })}
                labelClassName={optionLabelClassName ?? ''}
                checked={value ? value.includes(option.value) : false}
                label={option.label}
                value={option.value}
                error={typeof error === 'boolean' && error}
                disabled={disabled}
                name={`${name}_${index}`}
                onChange={(e) => handleChange(e.target.checked, option.value)}
              />
            </div>
          ))}
        </div>
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

CheckboxCards.displayName = 'CheckboxCards';

export default CheckboxCards;

export { type CheckboxCardsProps };
