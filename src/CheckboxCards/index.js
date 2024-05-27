import React, { forwardRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Checkbox from '../Checkbox';
import s from './CheckboxCards.module.css';

const Index = forwardRef(
  (
    {
      name,
      onChange,
      value = [],
      options = [],
      label = null,
      inputClassName = null,
      cardClassName = null,
      labelClassName = null,
      optionLabelClassName = null,
      direction = 'column',
      hideInput = true,
      errorClassName = null,
      disabled = false,
      error = null,
    },
    inputRef
  ) => {
    const handleChange = useCallback(
      (checked, optionValue) => {
        let newValue;
        if (checked) {
          newValue = [...value, optionValue];
        } else {
          newValue = value?.filter((val) => val !== optionValue);
        }

        onChange({
          target: {
            name,
            value: newValue,
          },
        });
      },
      [onChange, value, name]
    );

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
                className={cx(cardClassName, s.card, {
                  [s.selected]: value ? value?.includes(option.value) : false,
                  [s.disabled]: disabled,
                  [s.inputError]: typeof error === 'boolean' && error,
                })}
                onClick={() =>
                  handleChange(
                    value ? value?.includes(option.value) : false,
                    option.value
                  )
                }
              >
                <Checkbox
                  ref={inputRef}
                  key={index}
                  inputClassName={cx(inputClassName, { [s.hide]: hideInput })}
                  labelClassName={optionLabelClassName}
                  checked={value ? value?.includes(option.value) : false}
                  label={option.label}
                  value={option.value}
                  error={error && typeof error === 'boolean'}
                  disabled={disabled}
                  name={`${name}_${index}`}
                  onChange={(e) => handleChange(e.target.checked, option.value)}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
});

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  options: PropTypes.arrayOf(Option).isRequired,
  inputClassName: PropTypes.string,
  cardClassName: PropTypes.string,
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

Index.displayName = 'CheckboxCards';

export default Index;
