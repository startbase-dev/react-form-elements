import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import cx from 'classnames';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

import s from './TextArea.module.css';

const TextArea = ({
  fluid,
  error,
  value,
  onChange,
  placeholder,
  label,
  disabled,
  className,
  containerClassName,
  innerContainerClassName,
  innerWrapperClassName,
  onFocus,
  onBlur,
  name,
  rows,
  resizable,
  disableShrink,
  ...rest
}) => {
  const inputEl = useRef();
  const [focused, setFocus] = useState(false);

  const resizeTextArea = () => {
    if (resizable) {
      inputEl.current.style.height = 'auto';
      inputEl.current.style.height = inputEl.current.scrollHeight + 'px';
    }
  };

  useEffect(resizeTextArea, [resizable, value]);

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
        rows={rows}
        className={cx(s.input, {
          [className]: className,
          [s.withLabel]: !!label,
          [s.disabled]: disabled,
          [s.disableShrinkInput]: disableShrink,
          [s.withPlaceholderLabel]: placeholder && label,
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
  }, [className, disableShrink, disabled, name, value, handleChange, rest]);

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
    <div
      className={cx(s.inputContainer, {
        [containerClassName]: containerClassName,
        [s.fluid]: fluid,
        [s.focusedContainer]: !placeholder && (focused || !!value),
      })}
    >
      <div
        className={cx(s.innerContainer, {
          [innerContainerClassName]: innerContainerClassName,
        })}
      >
        {label && labelEl}
        <div
          onClick={setFocusState}
          className={cx(s.innerWrapper, {
            [innerWrapperClassName]: innerWrapperClassName,
          })}
        >
          {textArea}
        </div>
      </div>
      {errorMessage ? <div className={s.errorLabel}>{errorMessage}</div> : null}
    </div>
  );
};

TextArea.propTypes = {
  fluid: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  resizable: PropTypes.bool,
  disableShrink: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  innerContainerClassName: PropTypes.string,
  innerWrapperClassName: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.number,
};

TextArea.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  fluid: true,
  placeholder: '',
  label: '',
  className: '',
  containerClassName: '',
  innerContainerClassName: '',
  innerWrapperClassName: '',
  disabled: false,
  value: '',
  error: null,
  name: '',
  rows: 5,
  resizable: false,
  disableShrink: false,
};

export default TextArea;
