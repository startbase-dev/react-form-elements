import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import s from './Slider.module.css';

const Index = forwardRef(
  (
    {
      name,
      onChange,
      label = null,
      value = null,
      range = false,
      vertical = false,
      tracksClassName = null,
      trackClassName = null,
      railClassName = null,
      handleClassName = null,
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
              tracks: cx(s.tracks, {
                [tracksClassName]: tracksClassName,
              }),
              track: cx(s.track, {
                [trackClassName]: trackClassName,
              }),
              rail: cx(s.rail, {
                [railClassName]: railClassName,
              }),
              handle: cx(s.handle, {
                [handleClassName]: handleClassName,
              }),
            }}
            activeDotStyle={{
              borderColor: 'var(--rfe-black)',
              background: 'var(--rfe-black)',
            }}
            className={cx(s.slider, {
              [s.vertical]: vertical,
              [s.horizontal]: !vertical,
              [s.disabled]: disabled,
              [s.error]: typeof error === 'boolean' && error,
            })}
            name={name}
            dotStyle={{
              top: vertical ? 'unset' : '1px',
              right: vertical ? '-5px' : 'unset',
              borderColor: 'var(--rfe-border)',
              background: 'var(--rfe-border)',
            }}
            value={
              value === null && range ? [0, 0] : value === null ? 0 : value
            }
            onChange={handleOnChange}
            disabled={disabled}
            range={range}
            vertical={vertical}
            {...rest}
            z
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
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  range: PropTypes.bool,
  vertical: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  tracksClassName: PropTypes.string,
  trackClassName: PropTypes.string,
  railClassName: PropTypes.string,
  handleClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

Index.displayName = 'Slider';

export default Index;
