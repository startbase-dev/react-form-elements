import React, { forwardRef, useMemo } from 'react';
import cx from 'clsx';
import CalendarRoot, { CalendarRootSingleProps } from './CalendarRoot';
import s from './Calendar.module.scss';

interface CalendarProps extends CalendarRootSingleProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | string | { message?: string };
  label?: string;
  value?: Date | null;
  labelClassName?: string;
  errorClassName?: string;
  calendarClassName?: string;
  disabled?: boolean;
}

const Calendar = forwardRef<HTMLInputElement, CalendarProps>(
  (
    {
      name,
      onChange,
      error = null,
      label = null,
      value = null,
      labelClassName = null,
      errorClassName = null,
      calendarClassName = null,
      disabled = false,
      ...rest
    },
    inputRef
  ) => {
    const handleDaySelect = (date: Date | undefined) => {
      if (date) {
        onChange({
          target: {
            name: name,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value: date,
          },
        });
      }
    };

    const errorMessage = useMemo(() => {
      if (error && typeof error === 'string') {
        return error;
      }
      if (error && typeof error === 'object' && error?.message) {
        return error.message;
      }
      return null;
    }, [error]);

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [labelClassName || '']: labelClassName,
          })}
        >
          {label}
        </label>
      ),
      [name, labelClassName, label]
    );

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {label ? labelEl : null}

          <input
            type="hidden"
            name={name}
            value={value ? value.toISOString() : ''}
            ref={inputRef}
          />

          <CalendarRoot
            className="globals_rdp"
            calendarClassName={calendarClassName}
            error={error}
            disabled={disabled}
            selected={value instanceof Date ? value : undefined}
            onSelect={handleDaySelect}
            {...rest}
          />
        </div>
        {errorMessage && (
          <span
            className={cx(s.errorLabel, {
              [errorClassName || '']: errorClassName,
            })}
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export default Calendar;

export { type CalendarProps };
