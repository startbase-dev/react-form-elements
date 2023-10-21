import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { CheckIcon } from '../Icon';
import s from './Checkbox.module.css';

function Checkbox({
  label = null,
  name = null,
  checked = false,
  className = '',
  onChange = () => {},
  disabled = false,
  error = null,
}) {
  return (
    <label
      htmlFor={name ? `checkbox_${name}` : ''}
      className={cx(s.root, className)}
    >
      <div className={cx(s.inputRoot)}>
        <input
          className={s.input}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={name ? `checkbox_${name}` : ''}
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
      {error ? <div className={s.errorLabel}>{error}</div> : null}
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  error: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Checkbox;
