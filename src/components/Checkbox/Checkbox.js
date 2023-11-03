import React, { forwardRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { CheckIcon } from '../Icon';
import s from './Checkbox.module.css';

const Checkbox = forwardRef(
  (
    {
      name,
      onChange,
      label = null,
      checked = false,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      disabled = false,
      error = null,
    },
    inputRef
  ) => {
    const errorMessage = useMemo(() => {
      let message = '';
      if (error && typeof error === 'string') {
        message = error;
      } else if (error && typeof error === 'object' && error?.message) {
        message = error?.message;
      } else {
        message = null;
      }

      return message;
    }, [error, name, label]);

    return (
      <label htmlFor={`checkbox_${name}`} className={s.root}>
        <div className={cx(s.inputRoot)}>
          <input
            ref={inputRef}
            className={s.input}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id={`checkbox_${name}`}
            disabled={disabled}
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

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
  checked: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
