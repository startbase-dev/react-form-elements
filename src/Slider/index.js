import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import s from './Slider.module.css';

const Index = forwardRef(
  (
    {
      name,
      onChange,
      label = null,
      value = 0,
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      disabled = false,
      error = null,
      ...rest
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

    const handleOnChange = (value) => {
      onChange({
        target: {
          name,
          value: value,
        },
      });
    };

    return (
      <div className={s.root}>
        {label && (
          <div
            className={cx(s.label, {
              [labelClassName]: labelClassName,
            })}
          >
            {label}
          </div>
        )}
        <div className={cx(s.inputRoot)}>
          <Slider
            ref={inputRef}
            classNames={{
              tracks: s.tracks,
              track: s.track,
              rail: s.rail,
              handle: s.handle,
            }}
            className={cx(s.slider, {
              [s.disabled]: disabled,
              [s.error]: typeof error === 'boolean' && error,
              [inputClassName]: inputClassName,
            })}
            name={name}
            value={value}
            onChange={handleOnChange}
            disabled={disabled}
            {...rest}
          />
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

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

Index.displayName = 'Slider';

export default Index;
