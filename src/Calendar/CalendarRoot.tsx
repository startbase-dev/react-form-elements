import React from 'react';
import {
  DayPicker,
  type PropsMulti,
  type PropsSingle,
  type PropsRange,
} from 'react-day-picker';
import cx from 'clsx';
import s from './CalendarRoot.module.scss';

export interface CalendarRootRangeProps extends PropsRange {
  numberOfMonths?: number;
  classNames?: Partial<Record<string, string>>;
  calendarClassName?: string | null;
  className?: string;
  disabled?: boolean;
  error?: boolean | string | { message?: string } | null;
}

export interface CalendarRootSingleProps extends PropsSingle {
  numberOfMonths?: number;
  classNames?: Partial<Record<string, string>>;
  calendarClassName?: string | null;
  className?: string;
  disabled?: boolean;
  error?: boolean | string | { message?: string } | null;
}

export interface CalendarRootMultipleProps extends PropsMulti {
  numberOfMonths?: number;
  classNames?: Partial<Record<string, string>>;
  calendarClassName?: string | null;
  className?: string;
  disabled?: boolean;
  error?: boolean | string | { message?: string } | null;
}

const CalendarRoot: React.FC<
  CalendarRootRangeProps | CalendarRootSingleProps | CalendarRootMultipleProps
> = ({
  disabled,
  error,
  className,
  classNames,
  calendarClassName,
  numberOfMonths = 1,
  ...rest
}) => {
  return (
    <DayPicker
      disabled={disabled}
      className={cx(s.calendar, 'globals_rdp', {
        [className || '']: className,
      })}
      {...rest}
      numberOfMonths={numberOfMonths}
      classNames={{
        ...classNames,
        caption_label: cx(s.captionLabel, {
          [classNames?.caption_label || '']: classNames?.caption_label,
        }),
        ...(numberOfMonths === 1
          ? {
              month: cx({
                [s.month]: numberOfMonths === 1,
                [s.disabled]: disabled,
                [calendarClassName || '']: calendarClassName,
                [classNames?.month || '']: classNames?.month,
                [s.error]: error,
              }),
            }
          : {}),
        ...(numberOfMonths > 1
          ? {
              months: cx({
                [s.error]: error,
                [s.months]: numberOfMonths > 1,
                [s.disabled]: disabled,
                [classNames?.months || '']: classNames?.months,
                [calendarClassName || '']: calendarClassName,
              }),
            }
          : {}),
      }}
    />
  );
};

export default CalendarRoot;
