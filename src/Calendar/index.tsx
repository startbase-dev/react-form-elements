import React, { forwardRef, useMemo } from 'react';
import cx from 'clsx';
import s from './Calendar.module.scss';
import type { FieldError } from 'react-hook-form';
import CalendarRoot, { type CalendarRootSingleProps } from './CalendarRoot';

interface CalendarProps extends Omit<CalendarRootSingleProps, 'mode'> {
  name: string;
  error?:
    | boolean
    | string
    | { message?: string }
    | null
    | undefined
    | FieldError;
  label?: string;
  labelClassName?: string;
  errorClassName?: string;
  calendarClassName?: string;
  disabled?: boolean;
}

const Calendar = forwardRef<HTMLInputElement, CalendarProps>(
  (
    {
      name,
      error = null,
      label,
      labelClassName,
      errorClassName,
      calendarClassName,
      ...rest
    },
    rootRef
  ) => {
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
      <div className={cx(s.root)} ref={rootRef}>
        <div className={cx(s.inputRoot)}>
          {label ? labelEl : null}

          <CalendarRoot
            name={name}
            mode="single"
            calendarClassName={calendarClassName}
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
