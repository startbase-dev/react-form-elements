import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import Radio from '../Radio/Radio';
import s from './RadioGroup.module.css';

function RadioGroup({
  name,
  onChange,
  value = null,
  options = [],
  label = null,
  inputClassName = null,
  labelClassName = null,
  optionLabelClassName = null,
  errorClassName = null,
  disabled = false,
  error = null,
}) {
  return (
    <label className={cx(s.root, { [labelClassName]: labelClassName })}>
      <span className={s.label}>{label}</span>
      {options.map((option, index) => {
        return (
          <Radio
            key={index}
            inputClassName={inputClassName}
            labelClassName={optionLabelClassName}
            checked={option.value === value}
            label={option.label}
            value={option.value}
            disabled={disabled}
            name={name}
            onChange={onChange}
          />
        );
      })}
      {error ? (
        <div className={cx(s.errorLabel, { [errorClassName]: errorClassName })}>
          {error}
        </div>
      ) : null}
    </label>
  );
}

const Option = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
});

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  options: PropTypes.arrayOf(Option),
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  optionLabelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default RadioGroup;
