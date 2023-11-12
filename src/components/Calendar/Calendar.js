import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';

import CalendarRoot from './CalendarRoot';
import s from './Calendar.module.css';

const Calendar = ({
  name,
  onChange,
  error = null,
  label = null,
  value = '',
  labelClassName = null,
  errorClassName = null,
  disabled = false,
  ...rest
}) => {
  const handleDaySelect = (date) => {
    onChange({
      target: {
        name: name,
        value: date,
      },
    });
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

  const labelEl = useMemo(
    () => (
      <label
        htmlFor={name}
        className={cx(s.label, {
          [labelClassName]: labelClassName,
        })}
        onClick={() => {
          try {
            const inputs = document.querySelectorAll(`[name="${name}"]`);

            if (!inputs.length) {
              return;
            }

            let input = inputs?.[0];

            if (input?.type === 'hidden') {
              input = input?.parentNode?.querySelector('input');
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
    [name, labelClassName, label]
  );

  return (
    <div className={cx(s.root)}>
      <div className={cx(s.inputRoot)}>
        {label ? labelEl : null}

        <CalendarRoot
          error={error}
          disabled={disabled}
          selected={value instanceof Date ? value : null}
          onSelect={handleDaySelect}
          mode="single"
          {...rest}
        />
      </div>
      {errorMessage ? (
        <span
          className={cx(s.errorLabel, { [errorClassName]: errorClassName })}
        >
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

Calendar.displayName = 'Input';

const DateRangePickerInputProps = PropTypes.shape({
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
});

Calendar.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    DateRangePickerInputProps,
  ]),
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Calendar;
