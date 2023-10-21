import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { CheckIcon } from '../Icon';
import s from './Radio.module.css';

function Radio({
  label = null,
  name = null,
  checked = false,
  className = '',
  onChange = () => {},
  disabled = false,
  value = false,
  error = null,
  ...rest
}) {
  return (
    <label
      htmlFor={name ? `radio_${value}` : ''}
      className={cx(s.root, className)}
    >
      <div className={cx(s.inputRoot)}>
        <input
          {...rest}
          className={s.input}
          name={name}
          type="radio"
          checked={checked}
          value={value}
          onChange={onChange}
          id={`radio_${value}`}
          disabled={disabled}
        />
        <span
          className={cx(s.box, {
            [s.boxDisabled]: disabled,
          })}
        >
          <CheckIcon className={s.icon} />
        </span>
        <div className={s.text}>{label}</div>
      </div>
      {error ? <span className={s.errorLabel}>{error}</span> : null}
    </label>
  );
}

Radio.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  value: PropTypes.bool,
};

Radio.defaultProps = {
  name: null,
  checked: false,
  label: null,
  onChange: () => {},
  className: '',
  disabled: false,
  value: false,
  error: null,
};

export default Radio;
