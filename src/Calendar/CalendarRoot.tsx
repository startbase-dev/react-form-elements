import React from 'react';
import {
  DayPicker,
  type PropsSingle,
  type PropsMulti,
  type PropsRange,
} from 'react-day-picker';
import cx from 'clsx';
import s from './CalendarRoot.module.scss';
import { Controller, useFormContext } from 'react-hook-form';

export interface CalendarRootPropsBase {
  name: string;
  required?: boolean;
  disabled?: boolean;
  numberOfMonths?: number;
  error?: boolean | string | { message?: string } | null;
  className?: string;
  classNames?: Record<string, string>;
  calendarClassName?: string;
  onSelectCallback?: () => void;
}

export interface CalendarRootSingleProps
  extends CalendarRootPropsBase,
    Omit<PropsSingle, 'required'> {}
export interface CalendarRootMultipleProps
  extends CalendarRootPropsBase,
    Omit<PropsMulti, 'required'> {}
export interface CalendarRootRangeProps
  extends CalendarRootPropsBase,
    Omit<PropsRange, 'required' | 'disabled'> {}

export type CalendarRootProps =
  | CalendarRootSingleProps
  | CalendarRootMultipleProps
  | CalendarRootRangeProps;

const CalendarRoot: React.FC<CalendarRootProps> = ({
  name,
  required,
  disabled,
  error,
  className,
  classNames,
  calendarClassName,
  numberOfMonths = 1,
  onSelectCallback,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      disabled={disabled}
      render={({ field }) => (
        <DayPicker
          {...field}
          {...rest}
          selected={field.value}
          onSelect={(e: unknown) => {
            field.onChange(e);
            if (onSelectCallback) {
              onSelectCallback();
            }
          }}
          disabled={disabled}
          className={cx(s.calendar, 'globals_rdp', {
            [className || '']: className,
          })}
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
      )}
    />
  );
};

export default CalendarRoot;
