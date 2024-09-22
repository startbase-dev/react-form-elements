import React, { forwardRef, useMemo } from 'react';
import cx from 'clsx';
import Radio from '../Radio';
import s from './RadioCards.module.css';

interface Option {
  value: string;
  label: string | React.ReactNode;
}

interface RadioCardsProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | null;
  options: Option[];
  label?: string | React.ReactNode;
  inputClassName?: string;
  cardClassName?: string;
  labelClassName?: string;
  optionLabelClassName?: string;
  direction?: 'row' | 'column';
  errorClassName?: string;
  disabled?: boolean;
  hideInput?: boolean;
  error?: boolean | string | { message: string };
}

const RadioCards = forwardRef<HTMLInputElement, RadioCardsProps>(
  (
    {
      name,
      onChange,
      value = null,
      options = [],
      label = null,
      inputClassName = null,
      cardClassName = null,
      labelClassName = null,
      optionLabelClassName = null,
      direction = 'column',
      errorClassName = null,
      disabled = false,
      hideInput = true,
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

    const handleClick = (optionValue: string) => {
      if (disabled) return;

      onChange({
        target: {
          name,
          value: optionValue,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <label className={s.root}>
        <span
          className={cx(s.label, {
            ...(labelClassName ? { [labelClassName]: true } : {}),
          })}
        >
          {label}
        </span>
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
                [s.selected]: option.value === value,
                [s.disabled]: disabled,
                [s.inputError]: typeof error === 'boolean' && error,
              })}
              onClick={() => handleClick(option.value)}
            >
              <Radio
                ref={inputRef}
                inputClassName={cx(inputClassName, {
                  ...(hideInput ? { [s.hide]: true } : {}),
                })}
                labelClassName={optionLabelClassName}
                checked={option.value === value}
                label={option.label}
                value={option.value}
                error={error && typeof error === 'boolean'}
                disabled={disabled}
                name={name}
                onChange={onChange}
              />
            </div>
          ))}
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

RadioCards.displayName = 'RadioCards';

export default RadioCards;
