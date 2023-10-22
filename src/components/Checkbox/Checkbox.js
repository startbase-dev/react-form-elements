import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { CheckIcon } from '../Icon';
import s from './Checkbox.module.css';

function Checkbox({
  name,
  onChange,
  label = null,
  checked = false,
  inputClassName = null,
  labelClassName = null,
  errorClassName = null,
  disabled = false,
  error = null,
}) {
  return (
    <label htmlFor={`checkbox_${name}`} className={s.root}>
      <div className={cx(s.inputRoot)}>
        <input
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
        <div className={cx(s.errorLabel, { [errorClassName]: errorClassName })}>
          {error}
        </div>
      ) : null}
    </label>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  checked: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Checkbox;
