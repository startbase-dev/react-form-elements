import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import Radio from '../Radio/Radio';
import s from './RadioGroup.module.css';

function RadioGroup({
  options = [],
  label = null,
  name = null,
  className = '',
  onChange = () => {},
  disabled = false,
  value = false,
  error = null,
}) {
  return (
    <label htmlFor={`radio_${name}`} className={cx(s.root, className)}>
      <span className={s.label}>{label}</span>
      {options.map((option, index) => {
        return (
          <Radio
            key={index}
            checked={option.value === value}
            label={option.label}
            value={option.value}
            disabled={disabled}
            name={name}
            onChange={onChange}
          />
        );
      })}
      {error ? <div className={s.errorLabel}>{error}</div> : null}
    </label>
  );
}

RadioGroup.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  options: PropTypes.arrayOf({
    value: PropTypes.any,
    label: PropTypes.any,
  }),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  value: PropTypes.bool,
};

export default RadioGroup;
