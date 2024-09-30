import React, {
  useId,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import cx from 'clsx';
import {
  default as ReactSelect,
  components as SelectComponents,
  Props,
  GroupBase,
  SelectInstance,
} from 'react-select';
import makeAnimated from 'react-select/animated';

import s from './Select.module.scss';
import { FieldError } from 'react-hook-form';

const animatedComponents = makeAnimated();

interface Option {
  value: string | number;
  label: string | React.ReactNode;
}

interface SelectProps extends Props<Option, false, GroupBase<Option>> {
  name: string;
  error?:
    | boolean
    | string
    | { message?: string }
    | null
    | undefined
    | FieldError;
  label?: string | React.ReactNode;
  options?: Option[];
  placeholder?: string;
  value?: Option | null;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disableShrink?: boolean;
  disabled?: boolean;
  classNames?: Record<string, any>;
  components?: Record<string, any>;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  [rest: string]: any;
}

const Select = forwardRef<
  SelectInstance<Option, false, GroupBase<Option>>,
  SelectProps
>(
  (
    {
      name,
      onChange,
      error = null,
      label = null,
      options = [],
      placeholder = null,
      value = null,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      disableShrink = false,
      disabled = false,
      classNames = null,
      components = null,
      onFocus = () => ({}),
      onBlur = () => ({}),
      ...rest
    },
    inputRef // inputRef is now typed as a ForwardedRef of StateManager (ReactSelect component)
  ) => {
    const [focused, setFocused] = useState(false);

    const handleChange = useCallback(
      (option: Option | null) => {
        onChange({
          target: {
            name,
            value: option,
          },
        });
      },
      [inputRef, name, onChange]
    );

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [s.disableShrink]: disableShrink,
            [s.disabledLabel]: disabled,
            [s.labelPlaceholder]: label && placeholder && !disableShrink,
            [s.labelFocused]:
              (label && focused && !disableShrink) ||
              (label && value && !disableShrink),
            [labelClassName]: labelClassName,
          })}
        >
          {label}
        </label>
      ),
      [
        disabled,
        name,
        disableShrink,
        label,
        placeholder,
        focused,
        value,
        labelClassName,
        inputRef,
      ]
    );

    const errorMessage = useMemo(() => {
      if (error && typeof error === 'string') {
        return error;
      } else if (error && typeof error === 'object' && error.message) {
        return error.message;
      }
      return null;
    }, [error]);

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {label && disableShrink ? labelEl : null}

          <ReactSelect
            value={value}
            ref={inputRef}
            options={options}
            instanceId={useId()}
            onChange={handleChange}
            classNames={{
              input: () => s.innerInput,
              menu: () => s.menu,
              option: (state) =>
                state.isFocused || state.isSelected
                  ? s.optionFocused
                  : s.option,
              singleValue: () => s.singleValue,
              placeholder: () => s.placeholder,
              indicatorSeparator: () => s.indicatorSeparator,
              indicatorsContainer: () => s.indicatorsContainer,
              clearIndicator: () => s.clearIndicator,
              multiValue: () => s.multiValue,
              valueContainer: () =>
                label && !disableShrink ? s.valueContainer : null,
              multiValueRemove: () => s.multiValueRemove,
              ...classNames,
              control: (state) =>
                cx(s.input, {
                  [s.control]: !disableShrink && label,
                  [s.focus]: state.isFocused,
                  [s.inputError]: typeof error === 'boolean' && error,
                  [s.disabled]: state.isDisabled,
                  [inputClassName]: inputClassName,
                  [classNames?.control?.(state)]: classNames?.control?.(state),
                }),
            }}
            placeholder={placeholder}
            name={name}
            isDisabled={disabled}
            onFocus={(e) => {
              onFocus(e);
              setFocused(true);
            }}
            onBlur={(e) => {
              onBlur(e);
              setFocused(false);
            }}
            components={{ ...animatedComponents, ...components }}
            {...rest}
          />

          {label && !disableShrink ? labelEl : null}
        </div>
        {errorMessage && (
          <span
            className={cx(s.errorLabel, {
              ...(errorClassName ? { [errorClassName]: true } : {}),
            })}
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;

export { SelectComponents, type SelectProps };
