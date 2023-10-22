import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { CheckIcon } from '../Icon';
import s from './Radio.module.css';

function Radio({
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
}) {
  return (
    <label htmlFor={`radio_${name}_${value}`} className={cx(s.root)}>
      <div className={cx(s.inputRoot)}>
        <input
          {...rest}
          className={s.input}
          name={name}
          type="radio"
          checked={checked}
          value={value}
          onChange={onChange}
          id={`radio_${name}_${value}`}
          disabled={disabled}
        />
        <span
          className={cx(s.box, {
            [s.boxDisabled]: disabled,
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
      {error ? (
        <span
          className={cx(s.errorLabel, { [errorClassName]: errorClassName })}
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

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
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Radio;
