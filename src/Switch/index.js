import React, { forwardRef, useMemo } from 'react';

import PropTypes from 'prop-types';

import cx from 'clsx';

import s from './Switch.module.css';

const Index = forwardRef(
  (
    {
      name,
      onChange,
      label = null,
      checked = false,
      inputClassName = null,
      labelClassName = null,
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
      <label htmlFor={`switch_${name}`} className={s.switch}>
        <div className={s.inputRoot}>
          <input
            ref={inputRef}
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
              [s.inputError]: typeof error === 'boolean' && error,
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

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
  checked: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

Index.displayName = 'Switch';

export default Index;
