import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';
import DOMPurify from 'dompurify';

import s from './TextArea.module.css';

const TextArea = ({
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
}) => {
  const inputEl = useRef();
  const [focused, setFocus] = useState(false);

  const resizeTextArea = () => {
    if (autoGrow) {
      inputEl.current.style.height = 'auto';
      inputEl.current.style.height = inputEl.current.scrollHeight + 'px';
    }
  };

  useEffect(resizeTextArea, [autoGrow, value]);

  const handleChange = useCallback(
    (e) => {
      const inputName = e.target.name;
      const inputValue = DOMPurify.sanitize(e.target.value);

      onChange({
        ...e,
        target: {
          name: inputName,
          value: inputValue,
        },
      });
    },
    [onChange]
  );

  const setFocusState = useCallback(() => {
    setFocus(true);
    inputEl?.current?.focus();
  }, [inputEl]);

  const errorMessage = useMemo(() => {
    let message = '';
    if (error) {
      message = error;
    }

    return message.replace(name, label);
  }, [error, name, label]);

  const textArea = useMemo(() => {
    return (
      <textarea
        ref={inputEl}
        disabled={disabled}
        className={cx(s.input, {
          [s.withLabel]: !!label,
          [s.disabled]: disabled,
          [s.disableShrinkInput]: disableShrink,
          [inputClassName]: inputClassName,
        })}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        name={name}
        onFocus={(e) => {
          onFocus(e);
          setFocus(true);
        }}
        onBlur={(e) => {
          onBlur(e);
          setFocus(false);
        }}
        {...rest}
      />
    );
  }, [
    inputClassName,
    disableShrink,
    disabled,
    name,
    value,
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
    <div
      className={cx(s.inputContainer, {
        [s.focusedContainer]: !placeholder && (focused || !!value),
      })}
    >
      <div className={s.innerContainer}>
        {label && labelEl}
        <div onClick={setFocusState} className={s.innerWrapper}>
          {textArea}
        </div>
      </div>
      {errorMessage ? (
        <div className={cx(s.errorLabel, { [errorClassName]: errorClassName })}>
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
};

TextArea.propTypes = {
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
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TextArea;
