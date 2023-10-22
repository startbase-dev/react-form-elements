import React, { forwardRef, useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';
import DOMPurify from 'dompurify';

import s from './Input.module.css';

const Input = forwardRef(
  (
    {
      name,
      onChange,
      error = null,
      label = null,
      placeholder = null,
      value = '',
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
      (e) => {
        const inputName = e.target.name;
        const val = DOMPurify.sanitize(e.target.value);

        onChange({
          ...e,
          target: {
            name: inputName,
            value: val,
          },
        });
      },
      [onChange]
    );

    const input = useMemo(() => {
      return (
        <input
          type="text"
          className={cx(s.input, {
            [s.disableShrink]: disableShrink || !label,
            [s.placeholder]: label && placeholder && !disableShrink,
            [s.disabled]: disabled,
            [inputClassName]: inputClassName,
          })}
          name={name}
          value={value}
          ref={inputRef}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
      );
    }, [
      inputClassName,
      disableShrink,
      disabled,
      name,
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
            [s.labelPlaceholder]: label && placeholder && !disableShrink,
            [labelClassName]: labelClassName,
          })}
          onClick={() => {
            try {
              const inputs = document.querySelectorAll(`[name="${name}"]`);

              if (!inputs.length) {
                return;
              }

              let input = inputs?.[0];

              if (input?.type === 'hidden') {
                input = input?.parentNode?.querySelector('input');
              }

              input?.focus();
            } catch (error) {
              throw error;
            }
          }}
        >
          {label}
        </label>
      ),
      [name, disableShrink, label]
    );

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {prepend && (
            <div
              className={cx(s.prepend, {
                [prependClassName]: prependClassName,
              })}
            >
              {prepend}
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
        {error ? (
          <div
            className={cx(s.errorLabel, { [errorClassName]: errorClassName })}
          >
            {error}
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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

export default Input;
