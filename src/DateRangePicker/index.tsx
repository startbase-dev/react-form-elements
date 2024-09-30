import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'clsx';
import { format as dateFNSFormat } from 'date-fns';
import { usePopper } from 'react-popper';
import { FocusOn } from 'react-focus-on';
import CalendarRoot, { CalendarRootRangeProps } from '../Calendar/CalendarRoot';
import s from './DateRangePicker.module.scss';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { FieldError } from 'react-hook-form';

interface DateRangePickerProps extends CalendarRootRangeProps {
  name: string;
  onChange: (event: {
    target: { name: string; value: DateRange | undefined };
  }) => void;
  error?:
    | boolean
    | string
    | { message?: string }
    | null
    | undefined
    | FieldError;
  label?: string | null;
  placeholder?: string | null;
  value?: DateRange;
  inputClassName?: string | null;
  numberOfMonths?: number;
  separator?: string;
  labelClassName?: string | null;
  errorClassName?: string | null;
  calendarClassName?: string | null;
  format?: string;
  prepend?: React.ReactNode | JSX.Element | null;
  prependClassName?: string | null;
  append?: React.ReactNode | JSX.Element | null;
  appendClassName?: string | null;
  disableShrink?: boolean;
  disabled?: boolean;
}

const DateRangePicker = forwardRef<HTMLInputElement, DateRangePickerProps>(
  (
    {
      name,
      onChange,
      error = null,
      numberOfMonths = 2,
      separator = ' / ',
      label = null,
      placeholder = null,
      value,
      locale = null,
      format = 'MM/dd/yyyy',
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      calendarClassName = null,
      prepend = null,
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
      prependClassName = null,
      disableShrink = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>(value);
    const popperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );
    useImperativeHandle(ref, () => inputRef?.current!);

    const popper = usePopper(popperRef.current, popperElement, {
      placement: 'bottom-end',
    });

    const closePopper = () => {
      setIsPopperOpen(false);
      inputRef?.current?.focus();
    };

    const handleDaySelect: SelectRangeEventHandler | undefined = (
      date: DateRange | undefined
    ) => {
      setRange(date);
      onChange({
        target: {
          name: name,
          value: date,
        },
      });
      if (date?.from && date?.to) {
        closePopper();
      }
    };

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
          autoComplete="off"
          className={cx(s.input, {
            [s.disableShrink]: disableShrink || !label,
            [s.placeholder]: label && placeholder && !disableShrink,
            [s.disabled]: disabled,
            [s.focused]: isPopperOpen,
            [s.inputError]: typeof error === 'boolean' && error,
            ...(inputClassName ? { [inputClassName]: true } : {}),
          })}
          name={name}
          ref={inputRef}
          disabled={disabled}
          placeholder={placeholder || ''}
          readOnly
          value={
            (value as DateRange)?.from || (value as DateRange)?.to
              ? `${
                  (value as DateRange)?.from instanceof Date
                    ? dateFNSFormat(
                        (value as DateRange).from!,
                        format,
                        locale ? { locale } : {}
                      )
                    : (value as DateRange)?.from || ''
                } ${
                  (value as DateRange)?.from &&
                  (value as DateRange)?.to &&
                  separator
                    ? separator
                    : ''
                } ${
                  (value as DateRange)?.to instanceof Date
                    ? dateFNSFormat(
                        (value as DateRange).to!,
                        format,
                        locale ? { locale } : {}
                      )
                    : (value as DateRange)?.to || ''
                }`
              : ''
          }
          onClick={() => setIsPopperOpen((prevState) => !prevState)}
          onChange={() => ({})} // No-op to suppress warnings
        />
      );
    }, [
      disableShrink,
      label,
      placeholder,
      disabled,
      isPopperOpen,
      error,
      inputClassName,
      name,
      rest,
      value,
      format,
      locale,
      separator,
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
              (label &&
                ((value as DateRange)?.from || (value as DateRange)?.to) &&
                !disableShrink),
            ...(labelClassName ? { [labelClassName]: true } : {}),
          })}
          onClick={() => {
            const inputs = document.querySelectorAll(`[name="${name}"]`);
            let input: HTMLInputElement | undefined | null =
              inputs?.[0] as HTMLInputElement;
            if (input?.type === 'hidden') {
              input = input?.parentNode?.querySelector('input');
            }
            input?.focus();
            inputRef?.current?.focus();
            setIsPopperOpen((prevState) => !prevState);
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
                style={popper.styles.popper}
                {...popper.attributes.popper}
                ref={setPopperElement}
                role="dialog"
                aria-label="Calendar"
              >
                <CalendarRoot
                  error={error}
                  className={s.calendar}
                  calendarClassName={calendarClassName}
                  disabled={disabled}
                  initialFocus={isPopperOpen}
                  selected={range}
                  onSelect={handleDaySelect}
                  numberOfMonths={numberOfMonths}
                  {...rest}
                  mode="range"
                />
              </div>
            </FocusOn>
          )}

          {label && !disableShrink ? labelEl : null}
        </div>
        {errorMessage && (
          <span
            className={cx(s.errorLabel, {
              ...(errorClassName ? { [errorClassName]: true } : {}),
            })}
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;

export { type DateRangePickerProps };
