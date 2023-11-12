import React from 'react';

import { DayPicker } from 'react-day-picker';
import cx from 'classnames';
import 'react-day-picker/dist/style.css';

import s from './CalendarRoot.module.css';
import PropTypes from 'prop-types';

const CalendarRoot = ({
  disabled,
  error,
  className,
  classNames,
  numberOfMonths = 1,
  ...rest
}) => {
  return (
    <DayPicker
      disabled={disabled}
      className={cx(s.calendar, className)}
      {...rest}
      numberOfMonths={numberOfMonths}
      classNames={{
        caption_label: s.captionLabel,
        month: cx({
          [s.month]: numberOfMonths === 1,
          [s.disabled]: disabled,
          [s.error]: typeof error === 'boolean' && error,
        }),
        ...(numberOfMonths > 1
          ? {
              months: cx({
                [s.error]: typeof error === 'boolean' && error,

                [s.months]: numberOfMonths > 1,
                [s.disabled]: disabled,
              }),
            }
          : {}),
        ...classNames,
      }}
    />
  );
};

CalendarRoot.propTypes = {
  numberOfMonths: PropTypes.integer,
  classNames: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.any,
};

export default CalendarRoot;
