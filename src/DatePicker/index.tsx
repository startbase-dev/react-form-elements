import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { format as dateFNSFormat } from 'date-fns/format';
import { FocusOn } from 'react-focus-on';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react-dom';
import cx from 'clsx';
import CalendarRoot, {
  CalendarRootSingleProps,
} from '../Calendar/CalendarRoot';
import s from './DatePicker.module.scss';
import { FieldError, useFormContext } from 'react-hook-form';

interface DatePickerProps extends CalendarRootSingleProps {
  name: string;
  onChange: (event: unknown) => void;
  error?:
    | boolean
    | string
    | { message?: string }
    | null
    | undefined
    | FieldError;
  label?: string;
  placeholder?: string;
  value?: string | number | Date | undefined;
  locale?: any;
  format?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  calendarClassName?: string;
  prepend?: React.ReactNode;
  prependClassName?: string;
  append?: React.ReactNode;
  appendClassName?: string;
  disableShrink?: boolean;
  disabled?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      name,
      error = null,
      label = null,
      placeholder = undefined,
      locale = null,
      format = 'MM/dd/yyyy',
      inputClassName,
      labelClassName,
      errorClassName,
      calendarClassName,
      prepend = null,
      prependClassName,
      append = (
        <svg
          className={s.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
          <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </svg>
      ),
      appendClassName = null,
      disableShrink = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const { watch } = useFormContext();
    const value = watch(name) ?? '';
    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(ref, () => inputRef?.current!);
    const popperRef = useRef<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );

    const { refs, floatingStyles, update } = useFloating({
      placement: 'bottom-end',
      middleware: [offset(4), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    useLayoutEffect(() => {
      if (isPopperOpen && popperRef.current && popperElement) {
        refs.setReference(popperRef.current);
        refs.setFloating(popperElement);
        requestAnimationFrame(() => update());
      }
    }, [isPopperOpen, popperElement, refs, update]);

    const closePopper = () => {
      setIsPopperOpen(false);
      inputRef.current?.focus();
    };

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

    const input = useMemo(() => {
      return (
        <input
          type="text"
          autoComplete="off"
          readOnly
          className={cx(s.input, {
            [s.disableShrink]: disableShrink || !label,
            [s.placeholder]: label && placeholder && !disableShrink,
            [s.focused]: isPopperOpen,
            [s.disabled]: disabled,
            [s.inputError]: typeof error === 'boolean' && error,
            ...(inputClassName ? { [inputClassName]: true } : {}),
          })}
          name={name}
          value={
            value instanceof Date
              ? dateFNSFormat(value, format, locale ? { locale } : {})
              : String(value)
          }
          ref={inputRef}
          disabled={disabled}
          placeholder={placeholder}
          onClick={() => {
            inputRef.current?.focus();
            setIsPopperOpen((prevState) => !prevState);
          }}
          onChange={() => ({})}
        />
      );
    }, [
      rest,
      disableShrink,
      label,
      placeholder,
      isPopperOpen,
      disabled,
      error,
      inputClassName,
      name,
      value,
      format,
      locale,
    ]);

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [s.disableShrink]: disableShrink,
            [s.disabledLabel]: disabled,
            [s.labelPlaceholder]:
              (label && placeholder && !disableShrink) ||
              (label && value && !disableShrink),
            ...(labelClassName ? { [labelClassName]: true } : {}),
          })}
          onClick={() => {
            try {
              const inputs = document.querySelectorAll(`[name="${name}"]`);
              if (!inputs.length) {
                return;
              }
              let input = inputs[0] as HTMLInputElement;
              if (input?.type === 'hidden') {
                input = input.parentNode?.querySelector(
                  'input'
                ) as HTMLInputElement;
              }
              input?.focus();
              inputRef.current?.focus();
              setIsPopperOpen((prevState) => !prevState);
            } catch (error) {
              throw error;
            }
          }}
        >
          {label}
        </label>
      ),
      [disabled, name, disableShrink, label, placeholder, value, labelClassName]
    );

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {prepend && (
            <div
              className={cx(s.prepend, {
                [s.prependDisabledShrink]: disableShrink,
                ...(prependClassName ? { [prependClassName]: true } : {}),
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
              onClick={() => setIsPopperOpen((prevState) => !prevState)}
            >
              {append}
            </div>
          )}

          {label && disableShrink ? labelEl : null}

          <div ref={popperRef}>{input}</div>
          {isPopperOpen && (
            <FocusOn
              enabled={isPopperOpen}
              autoFocus
              onClickOutside={closePopper}
              onEscapeKey={closePopper}
              onDeactivation={closePopper}
              scrollLock={false}
            >
              <div
                className={s.popper}
                style={floatingStyles as React.CSSProperties}
                ref={setPopperElement}
                role="dialog"
                aria-label="Calendar"
              >
                <CalendarRoot
                  name={name}
                  onSelectCallback={() => closePopper()}
                  error={error}
                  className={s.calendar}
                  calendarClassName={calendarClassName}
                  disabled={disabled}
                  {...rest}
                  mode="single"
                />
              </div>
            </FocusOn>
          )}

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

DatePicker.displayName = 'DatePicker';

export default DatePicker;

export { type DatePickerProps };
