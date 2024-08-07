import React, { forwardRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import cx from 'clsx';

import Radio from '../Radio';
import s from './RadioGroup.module.css';

const Index = forwardRef(
  (
    {
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
    },
    inputRef
  ) => {
    const errorMessage = useMemo(() => {
      let message;
      if (error && typeof error === 'string') {
        message = error;
      } else if (error && typeof error === 'object' && error?.message) {
        message = error?.message;
      } else {
        message = null;
      }

      return message;
    }, [error]);

    return (
      <label className={s.root}>
        <span className={cx(s.label, { [labelClassName]: labelClassName })}>
          {label}
        </span>
        {options.map((option, index) => {
          return (
            <Radio
              ref={inputRef}
              key={index}
              inputClassName={inputClassName}
              labelClassName={optionLabelClassName}
              checked={option.value === value}
              label={option.label}
              value={option.value}
              error={error && typeof error === 'boolean'}
              disabled={disabled}
              name={name}
              onChange={onChange}
            />
          );
        })}
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

const Option = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
});

Index.propTypes = {
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
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
};

Index.displayName = 'RadioGroup';

export default Index;
