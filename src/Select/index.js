import React, {
  useId,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { default as ReactSelect, components } from 'react-select';
import makeAnimated from 'react-select/animated';

import s from './Select.module.css';

const animatedComponents = makeAnimated();

const Index = forwardRef(
  (
    {
      name,
      onChange,
      error = null,
      label = null,
      options = [],
      placeholder = null,
      value = '',
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      disableShrink = false,
      disabled = false,
      classNames = null,
      components = null,
      onFocus = () => {},
      onBlur = () => {},
      ...rest
    },
    inputRef
  ) => {
    const [focused, setFocused] = useState(false);
    const handleChange = useCallback(
      (option, { action }) => {
        if (action === 'clear') {
          inputRef?.current?.blur();
        }
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
            [s.labelPlaceholder]: label && placeholder && !disableShrink,
            [s.labelFocused]:
              (label && focused && !disableShrink) ||
              (label && value?.length !== 0 && !!value && !disableShrink),
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
              inputRef?.current?.focus();
            } catch (error) {
              throw error;
            }
          }}
        >
          {label}
        </label>
      ),
      [
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
        {errorMessage ? (
          <span
            className={cx(s.errorLabel, { [errorClassName]: errorClassName })}
          >
            {errorMessage}
          </span>
        ) : null}
      </div>
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
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
  options: PropTypes.arrayOf(Option),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disableShrink: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  classNames: PropTypes.object,
  components: PropTypes.object,
};

Index.displayName = 'Select';

export default Index;

export { components };
