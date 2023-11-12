import React, { forwardRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { CheckIcon } from '../Icon';
import s from './Radio.module.css';

const Radio = forwardRef(
  (
    {
      name,
      onChange,
      value,
      label = null,
      checked = false,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      disabled = false,
      error = null,
      ...rest
    },
    inputRef
  ) => {
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

    return (
      <label htmlFor={`radio_${name}_${value}`} className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          <input
            ref={inputRef}
            className={s.input}
            name={name}
            type="radio"
            checked={checked}
            value={value}
            onChange={onChange}
            id={`radio_${name}_${value}`}
            disabled={disabled}
            {...rest}
          />
          <span
            className={cx(s.box, {
              [s.boxDisabled]: disabled,
              [s.inputError]: typeof error === 'boolean' && error,
              [inputClassName]: inputClassName,
            })}
          >
            <CheckIcon className={s.icon} />
          </span>
          <div
            className={cx(s.label, {
              [labelClassName]: labelClassName,
            })}
          >
            {label}
          </div>
        </div>
        {errorMessage ? (
          <div
            className={cx(s.errorLabel, { [errorClassName]: errorClassName })}
          >
            {errorMessage}
          </div>
        ) : null}
      </label>
    );
  }
);

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  checked: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
};

Radio.displayName = 'Radio';

export default Radio;
