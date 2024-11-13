import React, { forwardRef, useMemo } from 'react';
import cx from 'clsx';
import Slider from 'rc-slider';
import s from './Slider.module.scss';
import { FieldError } from 'react-hook-form';

interface SliderProps {
  name: string;
  onChange: (event: {
    target: { name: string; value: number | number[] };
  }) => void;
  label?: string | React.ReactNode;
  value?: number | number[] | null;
  range?: boolean;
  vertical?: boolean;
  defaultValue?: number[];
  tracksClassName?: string;
  trackClassName?: string;
  railClassName?: string;
  handleClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  error?:
    | boolean
    | string
    | { message?: string }
    | null
    | undefined
    | FieldError;
  [rest: string]: any;
}

const SliderComponent = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      name,
      onChange,
      label = null,
      value = null,
      range = false,
      vertical = false,
      defaultValue = [0, 0],
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
      if (error && typeof error === 'string') {
        return error;
      } else if (error && typeof error === 'object' && error.message) {
        return error.message;
      }
      return null;
    }, [error]);

    const handleOnChange = (value: number | number[]) => {
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
              ...(labelClassName ? { [labelClassName]: true } : {}),
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
                ...(tracksClassName ? { [tracksClassName]: true } : {}),
              }),
              track: cx(s.track, {
                ...(trackClassName ? { [trackClassName]: true } : {}),
              }),
              rail: cx(s.rail, {
                ...(railClassName ? { [railClassName]: true } : {}),
              }),
              handle: cx(s.handle, {
                ...(handleClassName ? { [handleClassName]: true } : {}),
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
            dotStyle={{
              top: vertical ? 'unset' : '1px',
              right: vertical ? '-5px' : 'unset',
              borderColor: 'var(--rfe-border)',
              background: 'var(--rfe-border)',
            }}
            value={
              value === null && range ? defaultValue : value === null ? 0 : value
            }
            onChange={handleOnChange}
            disabled={disabled}
            range={range}
            vertical={vertical}
            {...rest}
          />
        </div>
        {errorMessage && (
          <div
            className={cx(s.errorLabel, {
              ...(errorClassName ? { [errorClassName]: true } : {}),
            })}
          >
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

SliderComponent.displayName = 'Slider';

export default SliderComponent;

export { type SliderProps };
