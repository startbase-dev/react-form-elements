import React, { forwardRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import AmountInputRoot from './AmountInputRoot';
import s from './AmountInput.module.css';

const Index = forwardRef(
  (
    {
      name,
      onChange,
      error = null,
      label = null,
      placeholder = null,
      value = null,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      prepend = null,
      prependClassName = null,
      append = null,
      appendClassName = null,
      disableShrink = false,
      disabled = false,
      ...rest
    },
    inputRef
  ) => {
    const handleChange = useCallback(
      (value, name) => {
        onChange({
          target: {
            name,
            value,
          },
        });
      },
      [onChange]
    );

    const input = useMemo(() => {
      return (
        <AmountInputRoot
          id={name}
          className={cx(s.input, {
            [s.disableShrink]: disableShrink,
            [s.noLabel]: !label,
            [s.disabled]: disabled,
            [s.inputError]: typeof error === 'boolean' && error,
            [inputClassName]: inputClassName,
          })}
          name={name}
          placeholder={placeholder}
          value={value}
          ref={inputRef}
          onValueChange={handleChange}
          disabled={disabled}
          groupSeparator=","
          decimalSeparator="."
          prefix="$"
          {...rest}
        />
      );
    }, [
      name,
      disableShrink,
      label,
      disabled,
      error,
      inputClassName,
      placeholder,
      value,
      inputRef,
      handleChange,
      rest,
    ]);

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [s.disableShrink]: disableShrink,
            [s.disabledLabel]: disabled,
            [s.focusedLabel]: label && placeholder && !disableShrink,
            [labelClassName]: labelClassName,
          })}
        >
          {label}
        </label>
      ),
      [disabled, name, disableShrink, label, placeholder, labelClassName]
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
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {prepend && (
            <div
              className={cx(s.prepend, {
                [s.prependDisabledShrink]: disableShrink,
                [prependClassName]: prependClassName,
              })}
            >
              {prepend || null}
            </div>
          )}

          {append && (
            <div
              className={cx(s.append, {
                [s.appendDisabledShrink]: disableShrink,
                [appendClassName]: appendClassName,
              })}
            >
              {append}
            </div>
          )}

          {label && disableShrink ? labelEl : null}

          {input}

          {label && !disableShrink ? labelEl : null}
        </div>
        {errorMessage ? (
          <div
            className={cx(s.errorLabel, { [errorClassName]: errorClassName })}
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    );
  }
);

Index.displayName = 'AmountInput';

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  prepend: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  prependClassName: PropTypes.string,
  append: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  appendClassName: PropTypes.string,
  disableShrink: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Index;
