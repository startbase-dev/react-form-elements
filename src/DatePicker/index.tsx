import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { format as dateFNSFormat } from 'date-fns/format';
import { FocusOn } from 'react-focus-on';
import { usePopper } from 'react-popper';
import cx from 'clsx';
import CalendarRoot, {
  CalendarRootSingleProps,
} from '../Calendar/CalendarRoot';
import s from './DatePicker.module.css';

interface DatePickerProps extends CalendarRootSingleProps {
  name: string;
  onChange: (event: unknown) => void;
  error?: boolean | string | { message?: string } | null;
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
      onChange,
      error = null,
      label = null,
      placeholder = undefined,
      value = '',
      locale = null,
      format = 'MM/dd/yyyy',
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      calendarClassName = null,
      prepend = null,
      prependClassName = null,
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
    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(ref, () => inputRef?.current!);
    const popperRef = useRef<HTMLDivElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(
      null
    );
    const popper = usePopper(popperRef.current, popperElement, {
      placement: 'bottom-end',
    });

    const closePopper = () => {
      setIsPopperOpen(false);
      inputRef.current?.focus();
    };

    const handleDaySelect = (date: Date) => {
      onChange({
        target: {
          name: name,
          value: date,
        },
      });
      closePopper();
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
                  selected={value instanceof Date ? value : undefined}
                  onSelect={handleDaySelect}
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
