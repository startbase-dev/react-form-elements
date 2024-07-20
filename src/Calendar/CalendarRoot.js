import React from 'react';

import { DayPicker } from 'react-day-picker';
import cx from 'clsx';

import s from './CalendarRoot.module.css';
import PropTypes from 'prop-types';

const CalendarRoot = ({
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
        [className]: className,
      })}
      {...rest}
      numberOfMonths={numberOfMonths}
      classNames={{
        ...classNames,
        caption_label: cx(s.captionLabel, {
          [classNames?.caption_label]: classNames?.caption_label,
        }),
        ...(numberOfMonths === 1
          ? {
              month: cx({
                [s.month]: numberOfMonths === 1,
                [s.disabled]: disabled,
                [calendarClassName]: calendarClassName,
                [classNames?.month]: classNames?.month,
                [s.error]: typeof error === 'boolean' && error,
              }),
            }
          : {}),
        ...(numberOfMonths > 1
          ? {
              months: cx({
                [s.error]: typeof error === 'boolean' && error,
                [s.months]: numberOfMonths > 1,
                [s.disabled]: disabled,
                [classNames?.months]: classNames?.months,
                [calendarClassName]: calendarClassName,
              }),
            }
          : {}),
      }}
    />
  );
};

CalendarRoot.propTypes = {
  numberOfMonths: PropTypes.number,
  classNames: PropTypes.object,
  calendarClassName: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.any,
};

export default CalendarRoot;
