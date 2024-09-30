import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ChangeEvent,
  FocusEvent,
  RefObject,
} from 'react';
import cx from 'clsx';
import s from './TextArea.module.scss';

type TextAreaProps = {
  name: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  value?: string;
  label?: string | null;
  placeholder?: string | null;
  disabled?: boolean;
  autoGrow?: boolean;
  disableShrink?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  error?: boolean | string | { message: string } | null;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      onFocus = () => ({}),
      onBlur = () => ({}),
      autoGrow = false,
      disableShrink = false,
      ...rest
    },
    ref: RefObject<HTMLTextAreaElement>
  ) => {
    const inputRef = useRef(ref?.current || null);
    const [focused, setFocused] = useState(false);

    const resizeTextArea = () => {
      if (autoGrow && inputRef.current) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
      }
    };

    useEffect(resizeTextArea, [autoGrow, value]);

    const errorMessage = useMemo(() => {
      let message: string | null = null;
      if (error && typeof error === 'string') {
        message = error;
      } else if (error && typeof error === 'object' && error?.message) {
        message = error.message;
      }
      return message;
    }, [error]);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange({
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
      inputRef.current?.focus();
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
            ...(inputClassName ? { [inputClassName]: true } : {}),
          })}
          value={value}
          onChange={handleChange}
          placeholder={placeholder || undefined}
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
            [s.disableShrink]: disableShrink,
            [s.disabledLabel]: disabled,
            [s.labelPlaceholder]: label && placeholder && !disableShrink,
            ...(labelClassName ? { [labelClassName]: true } : {}),
          })}
          onClick={() => {
            try {
              const inputs = document.querySelectorAll<HTMLTextAreaElement>(
                `[name="${name}"]`
              );

              if (!inputs.length) {
                return;
              }

              let input: HTMLTextAreaElement | null | undefined = inputs[0];

              if (input?.type === 'hidden') {
                input = input?.parentNode?.querySelector('textarea');
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
            className={cx(s.errorLabel, {
              ...(errorClassName ? { [errorClassName]: true } : {}),
            })}
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;

export { type TextAreaProps };
