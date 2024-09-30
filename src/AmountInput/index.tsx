import React, { forwardRef, useCallback, useMemo } from 'react';
import cx from 'clsx';
import AmountInputRoot, { type AmountInputRootProps } from './AmountInputRoot';
import s from './AmountInput.module.scss';

interface AmountInputProps extends AmountInputRootProps {
  name: string;
  error?: boolean | string | { message?: string } | null;
  label?: string | null;
  value?: string | number | readonly string[] | undefined;
  inputClassName?: string | null;
  labelClassName?: string | null;
  errorClassName?: string | null;
  prepend?: React.ReactNode | null;
  prependClassName?: string | null;
  append?: React.ReactNode | null;
  appendClassName?: string | null;
  disableShrink?: boolean;
  disabled?: boolean;
}

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      name,
      onChange,
      error = null,
      label = null,
      placeholder = undefined,
      value = undefined,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      prepend = null,
      prependClassName = null,
      append = null,
      appendClassName = null,
      disableShrink = false,
      disabled = false,
      ...rest
    },
    inputRef
  ) => {
    const handleChange = useCallback(
      (value: string, name: string) => {
        onChange!({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          target: {
            name,
            value,
          },
        });
      },
      [onChange]
    );

    const input = useMemo(() => {
      return (
        <AmountInputRoot
          id={name}
          className={cx(s.input, {
            [s.disableShrink]: disableShrink,
            [s.noLabel]: !label,
            [s.disabled]: disabled,
            [s.inputError]: typeof error === 'boolean' && error,
            [inputClassName as string]: inputClassName,
          })}
          name={name}
          placeholder={placeholder}
          value={value}
          ref={inputRef}
          onValueChange={handleChange}
          disabled={disabled}
          groupSeparator=","
          decimalSeparator="."
          prefix="$"
          {...rest}
        />
      );
    }, [
      name,
      disableShrink,
      label,
      disabled,
      error,
      inputClassName,
      placeholder,
      value,
      inputRef,
      handleChange,
      rest,
    ]);

    const labelEl = useMemo(() => {
      return (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [s.disableShrink]: disableShrink,
            [s.disabledLabel]: disabled,
            [s.focusedLabel]: label && placeholder && !disableShrink,
            [labelClassName as string]: labelClassName,
          })}
        >
          {label}
        </label>
      );
    }, [disabled, name, disableShrink, label, placeholder, labelClassName]);

    const errorMessage = useMemo(() => {
      let message: string | null = null;
      if (typeof error === 'string') {
        message = error;
      } else if (error && typeof error === 'object' && error.message) {
        message = error.message;
      }
      return message;
    }, [error]);

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {prepend && (
            <div
              className={cx(s.prepend, {
                [s.prependDisabledShrink]: disableShrink,
                [prependClassName as string]: prependClassName,
              })}
            >
              {prepend}
            </div>
          )}

          {append && (
            <div
              className={cx(s.append, {
                [s.appendDisabledShrink]: disableShrink,
                [appendClassName as string]: appendClassName,
              })}
            >
              {append}
            </div>
          )}

          {label && disableShrink ? labelEl : null}

          {input}

          {label && !disableShrink ? labelEl : null}
        </div>
        {errorMessage ? (
          <div
            className={cx(s.errorLabel, {
              [errorClassName as string]: errorClassName,
            })}
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    );
  }
);

AmountInput.displayName = 'AmountInput';

export default AmountInput;

export { type AmountInputProps };
