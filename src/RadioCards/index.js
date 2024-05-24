import React, { forwardRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import Radio from '../Radio';
import s from './RadioCards.module.css';

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
      direction = 'column',
      errorClassName = null,
      disabled = false,
      hideInput = true,
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

    const handleClick = (optionValue) => {
      if (disabled) return;

      onChange({
        target: {
          name,
          value: optionValue,
        },
      });
    };

    return (
      <label className={s.root}>
        <span className={cx(s.label, { [labelClassName]: labelClassName })}>
          {label}
        </span>
        <div
          className={cx(s.container, {
            [s.row]: direction === 'row',
            [s.column]: direction === 'column',
          })}
        >
          {options.map((option, index) => {
            return (
              <div
                key={index}
                className={cx(s.card, {
                  [s.selected]: option.value === value,
                  [s.disabled]: disabled,
                  [s.inputError]: typeof error === 'boolean' && error,
                })}
                onClick={() => handleClick(option.value)}
              >
                <Radio
                  ref={inputRef}
                  key={index}
                  inputClassName={cx(inputClassName, { [s.hide]: hideInput })}
                  labelClassName={optionLabelClassName}
                  checked={option.value === value}
                  label={option.label}
                  value={option.value}
                  error={error && typeof error === 'boolean'}
                  disabled={disabled}
                  name={name}
                  onChange={onChange}
                />
              </div>
            );
          })}
        </div>
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
  direction: PropTypes.oneOf(['row', 'column']),
  disabled: PropTypes.bool,
  hideInput: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
};

Index.displayName = 'RadioCards';

export default Index;
