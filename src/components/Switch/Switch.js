import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import s from './Switch.module.css';

function Switch({
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
    <label htmlFor={`switch_${name}`} className={s.switch}>
      <div className={s.inputRoot}>
        <input
          className={s.switchCheckbox}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={`switch_${name}`}
          disabled={disabled}
        />
        <div
          className={cx(s.switchLabel, {
            [s.disabled]: disabled,
            [inputClassName]: inputClassName,
            [s.switchInnerChecked]: checked,
          })}
        >
          <span
            className={cx(s.switchSwitch, {
              [s.switchSwitchChecked]: checked,
            })}
          />
        </div>
        <div className={cx(s.label, { [labelClassName]: labelClassName })}>
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

Switch.propTypes = {
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

export default Switch;
