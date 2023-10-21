import React, { forwardRef, useCallback, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';
import DOMPurify from 'dompurify';

import s from './Input.module.css';

const Input = forwardRef(
  (
    {
      error = null,
      name = '',
      label = null,
      placeholder = null,
      value = '',
      onChange = () => {},
      className = '',
      rootClassName = '',
      containerClassName = '',
      prepend = null,
      prependClassName = '',
      append = null,
      appendClassName = '',
      disableShrink = false,
      disabled = false,
      ...rest
    },
    inputRef
  ) => {
    const [active, setActive] = useState(false);
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
          className={cx(s.input, className, {
            [s.disableShrink]: disableShrink || !label,
            [s.placeholder]: label && placeholder && !disableShrink,
            [s.disabled]: disabled,
          })}
          name={name}
          value={value}
          ref={inputRef}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          {...rest}
        />
      );
    }, [
      className,
      disableShrink,
      disabled,
      name,
      active,
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
      <div className={cx(s.root, rootClassName)}>
        <div className={cx(s.inputRoot, containerClassName)}>
          {prepend && (
            <div className={cx(s.prepend, prependClassName)}>{prepend}</div>
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
        {error ? <div className={s.errorLabel}>{error}</div> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  prepend: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  prependClassName: PropTypes.string,
  append: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  appendClassName: PropTypes.string,
  disableShrink: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;
