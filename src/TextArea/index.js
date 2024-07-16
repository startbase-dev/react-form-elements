import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import cx from 'clsx';

import s from './TextArea.module.css';

const Index = forwardRef(
  (
    {
      name,
      onChange,
      error = null,
      value = '',
      placeholder = null,
      label = null,
      disabled = false,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      onFocus = () => {},
      onBlur = () => {},
      autoGrow = false,
      disableShrink = false,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef(ref);
    const [focused, setFocused] = useState(false);

    const resizeTextArea = () => {
      if (autoGrow) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
      }
    };

    useEffect(resizeTextArea, [autoGrow, value]);

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

    const handleChange = useCallback(
      (e) => {
        onChange({
          ...e,
          target: {
            name: e.target.name,
            value: e.target.value,
          },
        });
      },
      [onChange]
    );

    const setFocusState = useCallback(() => {
      setFocused(true);
      inputRef?.current?.focus();
    }, [inputRef]);

    const textArea = useMemo(() => {
      return (
        <textarea
          ref={inputRef}
          disabled={disabled}
          className={cx(s.input, {
            [s.withLabel]: !!label,
            [s.disabled]: disabled,
            [s.disableShrinkInput]: disableShrink,
            [s.inputError]: typeof error === 'boolean' && error,
            [inputClassName]: inputClassName,
          })}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          name={name}
          onFocus={(e) => {
            onFocus(e);
            setFocused(true);
          }}
          onBlur={(e) => {
            onBlur(e);
            setFocused(false);
          }}
          {...rest}
        />
      );
    }, [
      disabled,
      label,
      disableShrink,
      error,
      inputClassName,
      value,
      handleChange,
      placeholder,
      name,
      rest,
      onFocus,
      onBlur,
    ]);

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            ['yunus']: true,
            [s.disableShrink]: disableShrink,
            [s.disabledLabel]: disabled,
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
      [name, disableShrink, label, disabled, labelClassName, placeholder]
    );

    return (
      <div
        className={cx(s.inputContainer, {
          [s.focusedContainer]:
            !placeholder && (focused || !!value) && !disableShrink,
        })}
      >
        <div className={s.innerContainer}>
          {label && labelEl}
          <div onClick={setFocusState} className={s.innerWrapper}>
            {textArea}
          </div>
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

Index.displayName = 'TextArea';

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoGrow: PropTypes.bool,
  disableShrink: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Index;
