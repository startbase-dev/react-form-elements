import React, {
  forwardRef,
  useCallback,
  useMemo,
  ChangeEvent,
  RefObject,
} from 'react';
import cx from 'clsx';
import s from './Input.module.scss';
import { FieldError } from 'react-hook-form';

export interface DateRangePickerInputProps {
  from: Date;
  to: Date;
}

type InputProps = {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?:
    | boolean
    | string
    | { message?: string }
    | null
    | undefined
    | FieldError;
  label?: string | null;
  placeholder?: string | undefined;
  value?: string | boolean | number | Date | Date[] | DateRangePickerInputProps;
  inputClassName?: string | null;
  labelClassName?: string | null;
  errorClassName?: string | null;
  prepend?: React.ReactNode | JSX.Element | null;
  prependClassName?: string | null;
  append?: React.ReactNode | JSX.Element | null;
  appendClassName?: string | null;
  disableShrink?: boolean;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      onChange,
      error = null,
      label = null,
      placeholder = undefined,
      value = '',
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
    inputRef: RefObject<HTMLInputElement>
  ) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e);
      },
      [onChange]
    );

    const errorMessage = useMemo(() => {
      let message: string | null = null;
      if (error && typeof error === 'string') {
        message = error;
      } else if (error && typeof error === 'object' && error?.message) {
        message = error.message;
      }
      return message;
    }, [error]);

    const input = useMemo(() => {
      return (
        <input
          type="text"
          className={cx(s.input, {
            [s.disableShrink]: disableShrink || !label,
            [s.placeholder]: label && placeholder && !disableShrink,
            [s.disabled]: disabled,
            [s.inputError]: typeof error === 'boolean' && error,
            ...(inputClassName ? { [inputClassName]: true } : {}),
          })}
          name={name}
          value={value}
          ref={inputRef}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
      );
    }, [
      disableShrink,
      label,
      placeholder,
      disabled,
      error,
      inputClassName,
      name,
      value,
      inputRef,
      handleChange,
      rest,
    ]);

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [s.disabledLabel]: disabled,
            [s.disableShrink]: disableShrink,
            [s.labelPlaceholder]: label && placeholder && !disableShrink,
            ...(labelClassName ? { [labelClassName]: true } : {}),
          })}
          onClick={() => {
            try {
              const inputs = document.querySelectorAll<HTMLInputElement>(
                `[name="${name}"]`
              );

              if (!inputs.length) {
                return;
              }

              let input = inputs[0];

              if (input?.type === 'hidden') {
                input = input?.parentNode?.querySelector(
                  'input'
                ) as HTMLInputElement;
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
      [disabled, name, disableShrink, label, placeholder, labelClassName]
    );

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {prepend && (
            <div
              className={cx(s.prepend, {
                ...(prependClassName ? { [prependClassName]: true } : {}),
                [s.prependDisabledShrink]: disableShrink,
              })}
            >
              {prepend}
            </div>
          )}

          {append && (
            <div
              className={cx(s.append, {
                [s.appendDisabledShrink]: disableShrink,
                ...(appendClassName ? { [appendClassName]: true } : {}),
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
          <span
            className={cx(s.errorLabel, {
              ...(errorClassName ? { [errorClassName]: true } : {}),
            })}
          >
            {errorMessage}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

export { type InputProps };
