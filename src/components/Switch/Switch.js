import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import s from './Switch.module.css';

function Switch({
  label = null,
  name = null,
  checked = false,
  className = '',
  onChange = () => {},
  disabled = false,
  error = null,
}) {
  return (
    <label htmlFor={name ? `checkbox_${name}` : ''} className={s.switch}>
      <div className={cx(s.inputRoot, className)}>
        <input
          className={s.switchCheckbox}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={name ? `checkbox_${name}` : ''}
          disabled={disabled}
        />
        <div
          className={cx(s.switchLabel, {
            [s.disabled]: disabled,
          })}
        >
          <span
            className={cx(s.switchInner, {
              [s.switchInnerChecked]: checked,
            })}
          />
          <span
            className={cx(s.switchSwitch, {
              [s.switchSwitchChecked]: checked,
            })}
          />
        </div>
        <div className={s.text}>{label}</div>
      </div>
      {error ? <div className={s.errorLabel}>{error}</div> : null}
    </label>
  );
}

Switch.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  error: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Switch;
