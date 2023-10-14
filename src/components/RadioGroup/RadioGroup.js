import React from 'react';

import cx from 'classnames';
import PropTypes from 'prop-types';

import Radio from '../Radio/Radio';
import s from './RadioGroup.module.css';

function RadioGroup({
  options,
  label,
  name,
  className,
  onChange,
  disabled,
  value,
  error,
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
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

RadioGroup.defaultProps = {
  name: null,
  label: null,
  onChange: () => {},
  className: '',
  disabled: false,
};

export default RadioGroup;
