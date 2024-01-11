import React, { forwardRef, useMemo, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { format as dateFNSFormat } from 'date-fns';
import * as dateFNSLocales from 'date-fns/locale';
import { usePopper } from 'react-popper';
import { FocusOn } from 'react-focus-on';

import CalendarRoot from '../Calendar/CalendarRoot';

import s from './DateRangePicker.module.css';

const Index = forwardRef(
  (
    {
      name,
      onChange,
      error = null,
      numberOfMonths = 2,
      separator = ' / ',
      label = null,
      placeholder = null,
      value = '',
      locale = 'en',
      format = 'MM/dd/yyyy',
      inputClassName = null,
      labelClassName = null,
      errorClassName = null,
      calendarClassName = null,
      prepend = null,
      prependClassName = null,
      append = (
        <svg
          className={s.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
          <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </svg>
      ),
      appendClassName = null,
      disableShrink = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const [range, setRange] = useState(value);

    const popperRef = useRef();
    const inputRef = useRef(ref);
    const [popperElement, setPopperElement] = useState(null);

    const popper = usePopper(popperRef.current, popperElement, {
      placement: 'bottom-end',
    });

    const closePopper = () => {
      setIsPopperOpen(false);
      inputRef?.current?.focus();
    };

    const handleDaySelect = (date) => {
      setRange(date);
      onChange({
        target: {
          name: name,
          value: date,
        },
      });
      if (date?.from && date?.to) {
        closePopper();
      }
    };

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

    const input = useMemo(() => {
      return (
        <input
          type="text"
          autoComplete="off"
          className={cx(s.input, {
            [s.disableShrink]: disableShrink || !label,
            [s.placeholder]: label && placeholder && !disableShrink,
            [s.disabled]: disabled,
            [s.focused]: isPopperOpen,
            [s.inputError]: typeof error === 'boolean' && error,
            [inputClassName]: inputClassName,
          })}
          name={name}
          ref={inputRef}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
          readOnly
          value={
            value?.from || value?.to
              ? `${
                  value?.from
                    ? value?.from instanceof Date
                      ? dateFNSFormat(
                          value?.from,
                          format,
                          locale ? { locale: dateFNSLocales[locale] } : {}
                        )
                      : value?.from
                    : ''
                } ${value?.from && value?.to && separator ? separator : ''} ${
                  value?.to
                    ? value?.to instanceof Date
                      ? dateFNSFormat(
                          value?.to,
                          format,
                          locale ? { locale: dateFNSLocales[locale] } : {}
                        )
                      : value?.to
                    : ''
                }`
              : ''
          }
          onClick={() => {
            setIsPopperOpen((prevState) => !prevState);
          }}
          onChange={() => {}}
        />
      );
    }, [
      disableShrink,
      label,
      placeholder,
      disabled,
      isPopperOpen,
      error,
      inputClassName,
      name,
      rest,
      value,
      format,
      locale,
      separator,
    ]);

    const labelEl = useMemo(
      () => (
        <label
          htmlFor={name}
          className={cx(s.label, {
            [s.disableShrink]: disableShrink,
            [s.labelPlaceholder]:
              (label && placeholder && !disableShrink) ||
              (label && (value?.from || value?.to) && !disableShrink),
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
              setIsPopperOpen((prevState) => !prevState);
            } catch (error) {
              throw error;
            }
          }}
        >
          {label}
        </label>
      ),
      [name, disableShrink, label, placeholder, value, labelClassName]
    );

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.inputRoot)}>
          {prepend && (
            <div
              className={cx(s.prepend, {
                [prependClassName]: prependClassName,
              })}
            >
              {prepend}
            </div>
          )}

          {append && (
            <div
              className={cx(s.append, {
                [s.appendDisabledShrink]: disableShrink,
                [appendClassName]: appendClassName,
              })}
              onClick={() => setIsPopperOpen((prevState) => !prevState)}
            >
              {append}
            </div>
          )}

          {label && disableShrink ? labelEl : null}

          <div ref={popperRef}>{input}</div>
          {isPopperOpen && (
            <FocusOn
              enabled={isPopperOpen}
              autoFocus
              onClickOutside={closePopper}
              onEscapeKey={closePopper}
              onDeactivation={closePopper}
              scrollLock={false}
            >
              <div
                className={s.popper}
                style={popper.styles.popper}
                {...popper.attributes.popper}
                ref={setPopperElement}
                role="dialog"
                aria-label="Calendar"
              >
                <CalendarRoot
                  error={error}
                  className={s.calendar}
                  calendarClassName={calendarClassName}
                  disabled={disabled}
                  initialFocus={isPopperOpen}
                  selected={range}
                  onSelect={handleDaySelect}
                  numberOfMonths={numberOfMonths}
                  {...rest}
                  mode="range"
                />
              </div>
            </FocusOn>
          )}

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

Index.displayName = 'DateRangePicker';

const DateRangePickerInputProps = PropTypes.shape({
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
});

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    DateRangePickerInputProps,
  ]),
  inputClassName: PropTypes.string,
  numberOfMonths: PropTypes.number,
  separator: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  calendarClassName: PropTypes.string,
  locale: PropTypes.string,
  format: PropTypes.string,
  prepend: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  prependClassName: PropTypes.string,
  append: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  appendClassName: PropTypes.string,
  disableShrink: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Index;
